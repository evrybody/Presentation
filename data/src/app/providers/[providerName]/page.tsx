"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSidebar } from "@/features/Sidebar/SidebarContext";
import { GameItem } from "@/types/gameItem";
import { getAllGames } from "@/features/games/AllGamesData";
import { SlotsData } from "@/features/games/data/SlotsData";
import ItemGrid from "@/features/ItemGrid/ItemGrid";

import Loading from "@/app/loading";

import "./page.css";

const ProviderPage = () => {
  const params = useParams();
  const providerName = params.providerName as string;
  const router = useRouter();
  const { isOpen } = useSidebar();

  const [games, setGames] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!providerName) {
      setError("Invalid provider name");
      setLoading(false);
      return;
    }

    try {
      const providerGames = getAllGames();
      setGames(providerGames);

      if (providerGames.length === 0) {
        setError("No games found for this provider");
      }
    } catch {
      setError("Failed to load games");
    } finally {
      setLoading(false);
    }
  }, [providerName]);

  if (loading) {
    return (
      <div className={`container ${isOpen ? "container--unshifted" : ""}`}>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`container ${isOpen ? "container--unshifted" : ""}`}>
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => router.push("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${isOpen ? "container--unshifted" : ""}`}>
      <div className="provider-header">
        <h1 className="provider-title">{providerName} Games</h1>
        <p className="provider-subtitle">{games.length} games available</p>
      </div>

      <div className="item-wrapper">
        <ItemGrid games={SlotsData} type="games" itemsPerPage={21} />
        {/*to do styles*/}
      </div>
    </div>
  );
};

export default ProviderPage;
