"use client";
import Tabs from "@/components/tabs";
import { getTopRatedMovies } from "../services/tmDbService";
import { useEffect, useState } from "react";
import { getTopRatedTV } from "@/services/tTvDbService";

export default function Home() {
  const [activeTab, setActiveTab] = useState("TV Shows");
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "Movies") {
          const movies = await getTopRatedMovies();
          setData(movies.results.slice(0, 10)); // Top 10 items
        } else {
          const Tvs = await getTopRatedTV();
          setData(Tvs.results.slice(0, 10)); // Top 10 items
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
    fetchData();
  }, [activeTab]);

  return (
    <>
      <Tabs
        tabs={["TV Shows", "Movies"]}
        onChange={(tab) => setActiveTab(tab)}
      />
      <div>
        <h1>Top-Rated {activeTab}</h1>
        <ul>
          {data?.length > 0 ? (
            data.map((movie: any) => (
              <li key={movie.id}>
                <h3>{movie.title}</h3>
                <p>Rating: {movie.vote_average}</p>
              </li>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>{" "}
    </>
  );
}
