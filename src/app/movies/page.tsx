"use client";
import { useEffect, useState } from "react";
import {
  fetchMovieById,
  getTopRatedMovies,
  getSearchMovie,
} from "../../services/mDbService";
import Card from "../../components/Card";
import MediaModal from "../../components/MediaModal";
import { useSearch } from "@/context/SearchContext";

export default function MoviesPage() {
  const [media, setMedia] = useState<MediaType[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItemType | null>(
    null
  );
  const { debouncedQuery } = useSearch();

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      getTopRatedMovies().then((data) => {
        setMedia(data.results.slice(0, 10));
      });
    } else {
      getSearchMovie(debouncedQuery).then((data) => {
        setMedia(data.results);
      });
    }
  }, [debouncedQuery]);

  const openModal = async (media: MediaType) => {
    try {
      const data = await fetchMovieById(media.id);
      setSelectedMedia(data);
    } catch (error) {
      alert("Failed to fetch movie details.");
    }
  };
  return (
    <>
      <h1 className="py-8 text-3xl font-bold">Top-Rated Movies</h1>
      <div className="grid lg:grid-cols-4 2xl:grid-cols-5 gap-8">
        {media.map((mediaItem) => (
          <div
            onClick={() => openModal(mediaItem)}
            key={mediaItem.id || mediaItem.title}
          >
            <Card
              title={mediaItem?.title}
              image={mediaItem.backdrop_path}
              date={mediaItem.date}
            />
          </div>
        ))}
        {selectedMedia && (
          <MediaModal
            media={selectedMedia}
            onClose={() => setSelectedMedia(null)}
          />
        )}
      </div>
    </>
  );
}
