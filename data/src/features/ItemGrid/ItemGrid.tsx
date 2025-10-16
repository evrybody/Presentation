"use client";

import React, { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import defaultImage from "@/assets/imgs/defaultSlotImage.svg";

import useAuthStore from "@/store/Auth/authStore";

import ItemSkeleton from "./ItemSceleton";

import { GameItem } from "@/types/gameItem";

import { useSidebar } from "../Sidebar/SidebarContext";

import { Montserrat } from "next/font/google";

const cormorant = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
});

import styles from "./ItemGrid.module.css";

interface ProviderItem {
  id: number;
  name: string;
  image?: string;
}

type Item = GameItem | ProviderItem;

interface ItemGridProps {
  games: Item[];
  type: "games" | "providers";
  itemsPerPage?: number;
}

const ItemGrid = React.memo(function ItemGrid({
  games = [],
  type = "games",
  itemsPerPage = 0,
}: ItemGridProps) {
  const [visibleItems, setVisibleItems] = useState(itemsPerPage);
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { isOpen } = useSidebar();

  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + itemsPerPage, games.length));
      setIsLoading(false);
    }, 5000); // to do: change for fetch to backend
  }, [games.length, itemsPerPage]);

  const displayedItems = useMemo(
    () => games.slice(0, visibleItems),
    [games, visibleItems]
  );

  const hasMoreItems = useMemo(
    () => visibleItems < games.length,
    [visibleItems, games.length]
  );

  const renderGameItem = useCallback(
    (game: GameItem) => (
      <div key={game.id}>
        <div className={styles.gameCard}>
          <Link
            href={`/game/${game.id}/${isAuthenticated ? "real" : "demo"}`}
            prefetch={false}
          >
            <Image
              src={game.imageUrl}
              alt={game.name}
              loading="lazy"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "8px",
              }}
            />
            {/*to do preload page  */}
          </Link>
          <div className={styles.gameDescriptionWrapper}>
            <div className={`${cormorant.className} ${styles.gameDescription}`}>
              {isAuthenticated ? (
                <Link href={`/game/${game.id}/real`} prefetch={false}>
                  <span>{game.name}</span>
                </Link>
              ) : (
                <Link href={`/game/${game.id}/demo`} prefetch={false}>
                  <span>{game.name}</span>
                </Link>
              )}
            </div>
            <div className={styles.gameDemo}>
              <Link href={`/game/${game.id}/demo`} prefetch={false}>
                <span>Demo</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    ),
    []
  );

  const renderProviderItem = useCallback(
    (item: ProviderItem) => (
      <div key={item.id}>
        <Link
          href={`/providers/${item.name.toLowerCase().replace(/\s+/g, "")}`}
        >
          <div className={styles.providerCard}>
            <Image
              src={item.image ?? defaultImage}
              alt={item.name}
              className={styles.itemCardBackground}
              width={200}
              height={100}
              loading="lazy"
            />
          </div>
        </Link>
      </div>
    ),
    []
  );

  return (
    <div
      className={`${styles.itemGridContainer} ${
        isOpen ? styles.itemGridContainerUnshifted : ""
      }`}
    >
      <div className={styles.itemGrid}>
        {displayedItems.map((game) =>
          type === "games"
            ? renderGameItem(game as GameItem)
            : renderProviderItem(game as ProviderItem)
        )}
        {isLoading && (
          <>
            {Array.from({ length: 7 }).map((_, index) => (
              <ItemSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {hasMoreItems &&
        !isLoading /*to do service for loading more items and add loader*/ && (
          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
              Load more
            </button>
          </div>
        )}
    </div>
  );
});

export default ItemGrid;
