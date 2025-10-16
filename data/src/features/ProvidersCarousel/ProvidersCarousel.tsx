"use client";

import React from "react";
import Link from "next/link";
// import Image from "next/image";

import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

import { useSidebar } from "../Sidebar/SidebarContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import "./ProvidersCarousel.css";

interface ProvidersProps {
  id: number;
  name: string;
}

interface ItemGridProps {
  providers: ProvidersProps[];
  id?: string;
}

export default function ProvidersCarousel({
  providers = [],
  id,
}: ItemGridProps) {
  const { isOpen } = useSidebar();

  const uniqueNextClass = `game-grid-next-${id}`;
  const uniquePrevClass = `game-grid-prev-${id}`;

  return (
    <div
      className={`game-grid-container ${
        isOpen ? "game-grid-container--unshifted" : ""
      }`}
    >
      <Swiper
        modules={[Navigation]}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={6}
        spaceBetween={10}
        navigation={{
          nextEl: `.${uniqueNextClass}`,
          prevEl: `.${uniquePrevClass}`,
        }}
        className="game-grid-swiper"
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {providers.map((provider) => (
          <SwiperSlide key={provider.id}>
            <div
              className={`${cormorant.className} providers-carousel-container`}
            >
              <div className="provider-card">
                <Link
                  href={`/providers/${provider.name
                    .toLowerCase()
                    .replace(/\s+/g, "")}`}
                >
                  <span>{provider.name}</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className={`${uniquePrevClass} swiper-nav-btn`}
        aria-label="Previous providers"
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect
            x="25.5"
            y="25.5"
            width="25"
            height="25"
            rx="4.5"
            transform="rotate(180 25.5 25.5)"
            stroke="#F0CB6C"
          />
          <path
            d="M16.7742 21.8065L7.54836 12.5807"
            stroke="#F0CB6C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M7.54834 12.5807L16.7741 4.19356"
            stroke="#F0CB6C"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <button
        className={`${uniqueNextClass} swiper-nav-btn`}
        aria-label="Next providers"
      >
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="25"
            height="25"
            rx="4.5"
            stroke="#F0CB6C"
          />
          <path
            d="M9.22583 4.19354L18.4516 13.4193"
            stroke="#F0CB6C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M18.4517 13.4193L9.22585 21.8064"
            stroke="#F0CB6C"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  );
}
