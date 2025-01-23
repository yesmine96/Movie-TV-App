import { getTopRatedMovies } from "../services/tmdbService";

export default async function Home() {
  try {
    // Fetch top-rated movies
    const movies = await getTopRatedMovies();

    return (
      <div>
        <h1>Top-Rated Movies</h1>
        <ul>
          {movies.results.slice(0, 10).map((movie: any) => (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return <div>Error fetching top-rated movies!</div>;
  }
}
