"use client";
import { useEffect, useRef, useState } from "react";
import Tabs from "@/components/Tabs";
import {
  fetchMovieById,
  getTopRatedMovies,
  getSearchMovie,
} from "../services/mDbService";
import {
  fetchTvById,
  getSearchTv,
  getTopRatedTV,
} from "@/services/TvDbService";
import Card from "@/components/Card";
import MediaModal from "@/components/MediaModal";
import SearchInput from "@/components/SearchInput";

export default function Home() {
  const [activeTab, setActiveTab] = useState("TV Shows");
  const [media, setMedia] = useState<MediaType[]>([]);
  const [originalMedia, setoriginalMedia] = useState<MediaType[]>([]);
  const [SelectedMedia, setSelectedMedia] = useState<MediaItemType | null>(
    null
  );
  const [, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const prevSearchTerm = useRef<string>("");

  const openModal = async (Media: MediaType) => {
    let data = null;
    try {
      activeTab === "Movies"
        ? (data = await fetchMovieById(Media.id))
        : (data = await fetchTvById(Media.id));
      setSelectedMedia(data);
      setIsModalOpen(true);
    } catch (error: any) {
      alert("Failed to fetch movie details. Please check the ID.");
    }
  };

  const fetchMediaData = async (
    searchTerm: string,
    activeTab: string,
    type: "topRated" | "search"
  ): Promise<MediaType[]> => {
    try {
      const fetchFunction =
        type === "topRated"
          ? activeTab === "Movies"
            ? getTopRatedMovies
            : getTopRatedTV
          : activeTab === "Movies"
            ? getSearchMovie
            : getSearchTv;

      const response = await fetchFunction(searchTerm);

      return response.results.map((item: MediaType) => ({
        id: item.id,
        title: item.title || item.name || "Untitled",
        image: item.backdrop_path || "default-image.jpg",
        date: item.first_air_date || item.release_date || "Unknown Date",
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  useEffect(() => {
    if (searchTerm.length < 3) {
      fetchMediaData("", activeTab, "topRated").then((data) => {
        setMedia(data.slice(0, 10));
        setoriginalMedia(data.slice(0, 10));
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setMedia(originalMedia);
      return;
    }
    if (searchTerm === prevSearchTerm.current) {
      fetchMediaData(searchTerm, activeTab, "search").then((data) => {
        setMedia(data);
      });
      return;
    }
    const delayDebounce = setTimeout(() => {
      fetchMediaData(searchTerm, activeTab, "search").then((data) => {
        setMedia(data);
      });
    }, 1000);

    prevSearchTerm.current = searchTerm;

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, originalMedia, activeTab]);

  return (
    <>
      <SearchInput
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={` Search ${activeTab}`}
      />
      <div className="pl-32">
        <Tabs
          tabs={["TV Shows", "Movies"]}
          onChange={(tab) => setActiveTab(tab)}
        />
      </div>
      <div className="px-32 pt-6">
        <h1 className="pb-8 text-3xl font-bold"> Top-Rated {activeTab}</h1>
        <div className="grid lg:grid-cols-4 2xl:grid-cols-5 gap-8 ">
          {media?.length > 0 ? (
            media.map((mediaItem: MediaType) => (
              <div onClick={() => openModal(mediaItem)} key={mediaItem.id}>
                <Card
                  title={mediaItem.title}
                  image={mediaItem.image}
                  date={mediaItem.date}
                />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
          {SelectedMedia && (
            <MediaModal
              media={SelectedMedia}
              onClose={() => setSelectedMedia(null)}
            />
          )}
        </div>{" "}
      </div>
    </>
  );
}
