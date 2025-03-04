import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation"; // Mock this
import Tabs from "./Tabs";
import "@testing-library/jest-dom";

// Mock `usePathname` from Next.js
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

test("TV SHOWS tab is highlighted by default", () => {
  (usePathname as jest.Mock).mockReturnValue("/tvshows"); // Fake current route

  render(<Tabs />);

  // Check that TV SHOWS tab has active styling
  const tvTab = screen.getByRole("link", { name: /TV Shows/i });
  expect(tvTab).toHaveClass("border-2 bg-blue-500 border-blue-500 text-white");

  // Movies tab should NOT be active
  const moviesTab = screen.getByRole("link", { name: /Movies/i });
  expect(moviesTab).not.toHaveClass("border-2 bg-blue-500");
});

test("MOVIES tab is highlighted when on /movies route", () => {
  (usePathname as jest.Mock).mockReturnValue("/movies"); // Fake current route

  render(<Tabs />);

  //   Check that MOVIES tab has active styling
  const moviesTab = screen.getByRole("link", { name: /Movies/i });
  expect(moviesTab).toHaveClass(
    "border-2 bg-blue-500 border-blue-500 text-white"
  );

  // TV SHOWS tab should NOT be active
  const tvTab = screen.getByRole("link", { name: /TV Shows/i });
  expect(tvTab).not.toHaveClass("border-2 bg-blue-500");
});
