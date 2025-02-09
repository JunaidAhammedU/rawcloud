"use server";

import { Account, Avatars, Client, Databases, Storage } from "node-appwrite";
import { appwriteConfig } from "./config";
import { cookies } from "next/headers";
import { get } from "http";

export const createSessionClient = async () => {
  try {
    const client = new Client()
      .setEndpoint(appwriteConfig.endpointUrl)
      .setProject(appwriteConfig.projectId);

    const session = (await cookies()).get("appwrite-session");

    if (!session || !session.value) throw new Error("No session found");

    client.setSession(session.value);

    return {
      get account() {
        return new Account(client);
      },

      get databases() {
        return new Databases(client);
      },
    };
  } catch (error) {
    throw error;
  }
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(appwriteConfig.endpointUrl)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.secretKey);

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
};
