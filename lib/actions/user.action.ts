"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import { avatarPlaceholderUrl } from "@/constants";

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

// Send email OTP
export const sendEmailOTP = async (email: string) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

// Create account
export const createAccount = async ({ fullName, email }: any) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP(email);
  if (!accountId) throw new Error("Failed to create account");
  if (!existingUser) {
    const { databases } = await createAdminClient();

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

// Verify email OTP
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

// Get current user
export const getCurrentUser = async () => {
  const { databases, account } = await createAdminClient();

  try {
    const result = await account.get();
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", result.$id)]
    );

    if (user.total <= 0) throw new Error("User not found");
    return parseStringify(user.documents[0]);
  } catch (error) {
    throw error;
  }
};
