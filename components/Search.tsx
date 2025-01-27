"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { getFile } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const searchParams = useSearchParams();
  const searchQuery: any = searchParams.get("query") || "";
  const [result, setResult] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchFiles = async () => {
      const files = await getFile({ searchText: query });
      setResult(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, []);

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

        {open && <ul></ul>}
      </div>
    </div>
  );
};

export default Search;
