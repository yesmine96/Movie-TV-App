"use client";

import { useSearch } from "@/context/SearchContext";

interface SearchInputProps {
  placeholder: string;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchInput() {
  const { query, setQuery } = useSearch();

  return (
    <div className="max-w-sm mx-auto mt-10 ">
      <input
        type="text"
        placeholder={"placeholder"}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-10 border border-gray-300 rounded-md shadow-sm px-2"
      />{" "}
    </div>
  );
}
