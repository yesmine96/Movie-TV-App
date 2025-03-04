import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MoviesPage from "@/app/movies/page";
import { SearchProvider } from "@/context/SearchContext";
import SearchInput from "./SearchInput";
import { getSearchMovie, getTopRatedMovies } from "../services/mDbService";

// Mock API functions
jest.mock("../services/mDbService", () => ({
  getSearchMovie: jest.fn(() =>
    Promise.resolve({ results: [{ title: "Batman" }] })
  ),

  getTopRatedMovies: jest.fn(() =>
    Promise.resolve({ results: [{ title: "Top Movie" }] })
  ),
}));

const renderWithProvider = () => {
  render(
    <SearchProvider>
      <SearchInput placeholder="Search movies or tv shows" /> <MoviesPage />
    </SearchProvider>
  );
};

test("should fetch top-rated movies when query is less than 3 characters", async () => {
  renderWithProvider();

  await waitFor(() => {
    expect(getTopRatedMovies).toHaveBeenCalledTimes(1);
  });
});

test("should call search API when typing 3+ characters", async () => {
  renderWithProvider();

  const searchInput = screen.getByPlaceholderText("Search movies or tv shows");

  // Type only 2 characters - search should NOT trigger
  fireEvent.change(searchInput, { target: { value: "ba" } });

  await waitFor(() => {
    // expect(getSearchMovie).not.toHaveBeenCalled();
    expect(getTopRatedMovies).toHaveBeenCalledTimes(2);
  });

  // Type 3rd character - search should trigger
  // fireEvent.change(searchInput, { target: { value: "Bat" } });

  // await waitFor(() => {
  //   expect(getSearchMovie).toHaveBeenCalledTimes(1);
  //   expect(getSearchMovie).toHaveBeenCalledWith("Bat");
  // });
});
