"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { getFile } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import FormattedDateTime from "./FormattedDateTime";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const searchQuery: any = searchParams.get("query") || "";
  const [result, setResult] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFile({ types: [], searchText: query });
      setResult(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
    // Call your search API here
  }, [searchQuery]);
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
            {result.length > 0 ? (
              result.map((file) => (
                <li
                  key={file.$id}
                  className="flex items-center justify-between"
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file?.type}
                      extension={file.extension}
                      url={file?.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>
                  <FormattedDateTime
                    date={file?.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">No results found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
