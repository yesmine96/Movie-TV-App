"use client";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import { fetchMovieById, getTopRatedMovies } from "../services/tmDbService";
import { fetchTvById, getTopRatedTV } from "@/services/tTvDbService";
import Card from "@/components/Card";
import MediaModal from "@/components/MediaModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("TV Shows");
  const [media, setMedia] = useState<MediaType[]>([]);
  const [SelectedMedia, setSelectedMedia] = useState<MediaItemType | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = async (Media: MediaType) => {
    let data = null;
    try {
      activeTab === "Movies"
        ? (data = await fetchMovieById(Media.id))
        : (data = await fetchTvById(Media.id));
      setSelectedMedia(data);
      setIsModalOpen(true);
      console.log(data);
    } catch (error: any) {
      alert("Failed to fetch movie details. Please check the ID.");
    }
  };
  const fetchData = async (): Promise<MediaType[]> => {
    try {
      const response =
        activeTab === "Movies"
          ? await getTopRatedMovies()
          : await getTopRatedTV();
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
    fetchData().then((data) => {
      setMedia(data.slice(0, 10));
    });
  }, [activeTab]);

  return (
    <>
      <Tabs
        tabs={["TV Shows", "Movies"]}
        onChange={(tab) => setActiveTab(tab)}
      />
      <div className="px-32 pt-6">
        <h2 className="pb-8 text-xl">Top-Rated {activeTab}</h2>
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
