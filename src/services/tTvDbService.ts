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
    console.error("Error fetching top-rated movies", error);
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
