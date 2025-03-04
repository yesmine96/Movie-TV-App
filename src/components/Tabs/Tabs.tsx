"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Next.js 13+ way

export default function Tabs() {
  const pathname = usePathname(); // Get the current route

  return (
    <nav className="w-full max-w-xs flex rounded-md border border-gray-300 ">
      <Link
        href="/tvshows"
        className={`rounded-md flex-1 py-2 text-center transition-colors duration-300 ${
          pathname === "/tvshows"
            ? "border-2 bg-blue-500 border-blue-500 text-white"
            : "text-gray-500 hover:text-blue-500"
        }`}
      >
        <span className={pathname === "/tvshows" ? "font-bold" : ""}>
          TV Shows
        </span>
      </Link>
      <Link
        href="/movies"
        className={`rounded-md flex-1 py-2 text-center transition-colors duration-300 ${
          pathname === "/movies"
            ? "border-2 bg-blue-500 border-blue-500 text-white"
            : "text-gray-500 hover:text-blue-500"
        }`}
      >
        <span className={pathname === "/movies" ? "font-bold" : ""}>
          Movies
        </span>
      </Link>
    </nav>
  );
}
