"use client";

import { useSearch } from "@/context/SearchContext";

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const { query, setQuery } = useSearch();

  return (
    <div className="max-w-sm mx-auto mt-10 ">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-10 border border-gray-300 rounded-md shadow-sm px-2"
      />{" "}
    </div>
  );
}
