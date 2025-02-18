import api from "./api";

export const getTopRatedTV = async () => {
  try {
    const response = await api.get("tv/top_rated", {
      params: {
        language: "en-US",
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated Tvs", error);
    throw error;
  }
};
export const fetchTvById = async (tvId: number) => {
  try {
    const response = await api.get(`/tv/${tvId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Tv details:", error);
    throw error;
  }
};

export const getSearchTv = async (query: string) => {
  try {
    const response = await api.get("https://api.themoviedb.org/3/search/tv", {
      params: {
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search Tvs", error);
    throw error;
  }
};
