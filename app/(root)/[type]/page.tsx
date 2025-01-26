import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFile } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import { Models } from "node-appwrite";
import React from "react";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const files = await getFile({ types, searchText, sort });
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">5 MB</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden sm:block"> Sort By:</p>
            <Sort />
          </div>
        </div>
      </section>
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No File uploaded</p>
      )}
    </div>
  );
};

export default Page;
