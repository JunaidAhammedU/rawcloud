"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";
import { redirect } from "next/navigation";

// Get user by email
const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", [email])]
    );
    return result.total > 0 ? result.documents[0] : null;
  } catch (error) {
    throw new Error("Collection with the requested ID could not be found.");
  }
};

// Handle errors
const handleError = (error: any, message: string) => {
  console.error(error);
  throw new Error(message);
};

// send Email Otp
export const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

// create account with email
export const createAccount = async ({ fullName, email }: any) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP(email);
  if (!accountId) throw new Error("Failed to create account");
  if (!existingUser) {
    const { databases } = await createAdminClient();

    // Create user
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        accountId,
      }
    );
  }
  return parseStringify({ accountId });
};

// Verify Email OTP
export const verifyEmailOTP = async ({
  accountId,
  password,
}: {
  accountId: string;
  password: any;
}) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createSession(accountId, password);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify({ sessionId: session.$id });
  } catch (error) {
    handleError(error, "Failed to verify email OTP");
  }
};

// Get Current user
export const getCurrentUser = async () => {
  try {
    const { databases, account } = await createSessionClient();
    const result = await account.get();

    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)]
    );

    if (user.total <= 0) {
      return null;
    }

    return parseStringify(user.documents[0]);
  } catch (error) {
    return null;
  }
};

// Sign out user
export const signOutUser = async () => {
  const { account } = await createSessionClient();

  try {
    await account.deleteSession("current");
    (await cookies()).delete("appwrite-session");
  } catch (error) {
    handleError(error, "Failed to sign out user");
  } finally {
    redirect("/sign-in");
  }
};

// Sign out user
export const signInUser = async ({ email, password }: any) => {
  try {
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return parseStringify({ accountId: null, error: "User not found" });
    } else {
      await sendEmailOTP(email);
      return parseStringify({ accountId: existingUser.accountId });
    }
  } catch (error) {
    handleError(error, "Failed to sign in user");
  }
};
