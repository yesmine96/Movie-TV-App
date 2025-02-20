"use client";
import { useEffect, useState } from "react";
import {
  fetchTvById,
  getTopRatedTV,
  getSearchTv,
} from "../../services/TvDbService";
import Card from "../../components/Card";
import MediaModal from "../../components/MediaModal";
// import { useDebounce } from "../../utils/debounce";
import SearchInput from "@/components/SearchInput";
import { useSearch } from "@/context/SearchContext";

export default function TvShowsPage() {
  const [media, setMedia] = useState<MediaType[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItemType | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { debouncedQuery } = useSearch();

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      getTopRatedTV().then((data) => {
        setMedia(data.results.slice(0, 10));
      });
    } else {
      getSearchTv(debouncedQuery).then((data) => {
        setMedia(data.results);
      });
    }
  }, [debouncedQuery]);

  const openModal = async (media: MediaType) => {
    try {
      const data = await fetchTvById(media.id);
      setSelectedMedia(data);
    } catch (error) {
      alert("Failed to fetch TV show details.");
    }
  };

  return (
    <>
      <h1 className=" py-8 text-3xl font-bold">Top-Rated TV Shows</h1>
      <div className=" grid lg:grid-cols-4 2xl:grid-cols-5 gap-8">
        {media.map((mediaItem) => (
          <div onClick={() => openModal(mediaItem)} key={mediaItem.id}>
            <Card
              title={mediaItem.name}
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
