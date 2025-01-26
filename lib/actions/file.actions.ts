"use server";

import { createAdminClient } from "../appwrite";
import { InputFile } from "node-appwrite/file";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";
import { get } from "http";
import { constructFileUrl, getFileType, parseStringify } from "../utils";
import { revalidatePath } from "next/cache";

// Handle errors
const handleError = (error: any, message: string) => {
  console.error(error);
  throw new Error(message);
};

// Upload file
export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();
  try {
    const inpuFile = InputFile.fromBuffer(file, file.name);
    const bucketFiles = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inpuFile
    );

    const fileDocument = {
      type: getFileType(bucketFiles.name).type,
      name: bucketFiles.name,
      url: constructFileUrl(bucketFiles.$id),
      extension: getFileType(bucketFiles.name).extension,
      size: bucketFiles.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFiles.$id,
    };

    const newFile = await databases
      .createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument
      )
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFiles.$id);
        handleError(error, "Failed to upload file");
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};
