import axios from "axios";

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const TMDB_READ_ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN;

if (!TMDB_BASE_URL || !TMDB_READ_ACCESS_TOKEN) {
  throw new Error(
    `TMDB base URL or Read Access Token is missing in enviromment variables`
  );
}

// create an Axios instance

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_READ_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
export default api;
