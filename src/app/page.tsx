"use client";
import { useEffect, useState } from "react";
import Tabs from "@/components/Tabs";
import { getTopRatedMovies } from "../services/tmDbService";
import { getTopRatedTV } from "@/services/tTvDbService";
import Card from "@/components/Card";

type MediaItem = {
  title: string;
  image: string;
  date: string;
  id: string;
};
export default function Home() {
  const [activeTab, setActiveTab] = useState("TV Shows");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const fetchData = async (): Promise<MediaItem[]> => {
    try {
      const response =
        activeTab === "Movies"
          ? await getTopRatedMovies()
          : await getTopRatedTV();
      return response.results.map((item: any) => ({
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
            media.map((item: any) => (
              <Card
                key={item.id}
                title={item.title}
                image={item.image}
                date={item.date}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>{" "}
      </div>
    </>
  );
}
