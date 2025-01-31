interface MediaType {
  title: string;
  name?: string;
  image: string;
  date: string;
  id: number;
  first_air_date: string;
  backdrop_path: string;
  release_date: string;
}
interface MediaItemType extends MediaType {
  overview: string;
  genres: any;
  vote_average: number;
}
