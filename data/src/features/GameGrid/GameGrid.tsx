"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "../Sidebar/SidebarContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper/modules";
import { GameItem } from "@/types/gameItem";

import useAuthStore from "@/store/Auth/authStore";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

import { Cormorant_Garamond } from "next/font/google";
import "./GameGrid.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface GameGridProps {
  games: GameItem[];
  id?: string;
}

const GameGrid = memo(function GameGrid({ games = [], id }: GameGridProps) {
  const { isOpen } = useSidebar();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const uniqueNextClass = `game-grid-next-${id}`;
  const uniquePrevClass = `game-grid-prev-${id}`;

  return (
    <div
      className={`game-grid-container ${
        isOpen ? "game-grid-container--unshifted" : ""
      }`}
    >
      <Swiper
        modules={[Navigation, Grid]}
        grabCursor
        centeredSlides={false}
        slidesPerView={7}
        spaceBetween={7}
        // grid={{ fill: "row", rows: 2 }}
        navigation={{
          nextEl: `.${uniqueNextClass}`,
          prevEl: `.${uniquePrevClass}`,
        }}
        className="game-grid-swiper"
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 6 },
          480: { slidesPerView: 3, spaceBetween: 6 },
          768: { slidesPerView: 4, spaceBetween: 8 },
          1024: { slidesPerView: 4, spaceBetween: 8 },
          1200: { slidesPerView: 5, spaceBetween: 10 },
          1400: { slidesPerView: 7, spaceBetween: 12 },
        }}
      >
        {games.map((game) => (
          <SwiperSlide key={game.id}>
            <div className="game_card">
              <Link
                href={`/game/${game.id}/${isAuthenticated ? "real" : "demo"}`}
                prefetch={false}
              >
                <Image
                  src={game.imageUrl}
                  alt={game.name}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "8px",
                  }}
                />
              </Link>

              <div className="game_description_wrapper">
                <div className={`${cormorant.className} game_description`}>
                  <Link
                    href={`/game/${game.id}/${
                      isAuthenticated ? "real" : "demo"
                    }`}
                    prefetch={false}
                  >
                    <span>{game.name}</span>
                  </Link>
                </div>
                <div className="game_demo">
                  <Link href={`/game/${game.id}/demo`}>
                    <span>Demo</span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button className={`${uniquePrevClass} swiper-nav-btn`}>
        {/* prev arrow svg */}
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect
            x="25.5"
            y="25.5"
            width="25"
            height="25"
            rx="8"
            transform="rotate(180 25.5 25.5)"
            stroke="#F0CB6C"
          />
          <path
            d="M15.5 20.2 L8.9 13.1"
            stroke="#F0CB6C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8.9 13.1 L15.5 5.8"
            stroke="#F0CB6C"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <button className={`${uniqueNextClass} swiper-nav-btn`}>
        {/* next arrow svg */}
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="25"
            height="25"
            rx="7"
            stroke="#F0CB6C"
          />
          <path
            d="M10.5 6 L17 13.5"
            stroke="#F0CB6C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M17 13.5 L10.5 20.5"
            stroke="#F0CB6C"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
});

export default GameGrid;
