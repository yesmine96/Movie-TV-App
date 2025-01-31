import api from "./api";

export const getTopRatedMovies = async () => {
  try {
    const response = await api.get("movie/top_rated", {
      params: {
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated movies", error);
    throw error;
  }
};
export const fetchMovieById = async (movieId: number) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
