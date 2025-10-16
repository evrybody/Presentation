"use client";

import React, { useMemo, useState, useEffect } from "react";
// import Image from "next/image";

import { useSidebar } from "@/features/Sidebar/SidebarContext";

import viplvl1 from "@/assets/imgs/defaultSlotImage.svg";

import TopSection from "@/features/TopSection/topSection";

import "./page.css";

const levels = [
  {
    level: 1,
    title: "Associate",
    threshold: 10000,
    perks: [
      "Welcome bonus: 10 free spins",
      "+5% on next deposit once",
      "Merch",
    ],
    image: viplvl1,
  },
  {
    level: 2,
    title: "Partner",
    threshold: 50000,
    perks: ["+50 free spins", "Gift lootbox"],
    image: viplvl1,
  },
  {
    level: 3,
    title: "Executive",
    threshold: 100000,
    perks: ["Exclusive tournaments", "Increased cashback"],
    image: viplvl1,
  },
  {
    level: 4,
    title: "Director",
    threshold: 500000,
    perks: ["Monthly free spins", "Higher withdrawal limits"],
    image: viplvl1,
  },
  {
    level: 5,
    title: "Shareholder",
    threshold: 1000000,
    perks: [
      "Millionaire Club (private chat)",
      "Personal manager",
      "Special offers for high deposits",
      "Withdrawals within 24h",
    ],
    image: viplvl1,
  },
  {
    level: 6,
    title: "Vice President",
    threshold: 50000000,
    perks: ["Tech gifts", "Branded accessories"],
    image: viplvl1,
  },
  {
    level: 7,
    title: "President",
    threshold: 100000000,
    perks: ["Faster withdrawals (12h)", "Private events"],
    image: viplvl1,
  },
  {
    level: 8,
    title: "Board Member",
    threshold: 500000000,
    perks: ["Premium lootbox", "Personal advisor"],
    image: viplvl1,
  },
  {
    level: 9,
    title: "CEO",
    threshold: 1000000000,
    perks: [
      "Billionaire Club (private chat)",
      "Villa in Bali",
      "Holiday gifts",
      "Personal greetings",
      "Bespoke rewards",
      "Instant withdrawals",
    ],
    image: viplvl1,
  },
  {
    level: 10,
    title: "Owner",
    threshold: 2000000000,
    perks: ["One-week sponsored trip", "Enhanced cashback"],
    image: viplvl1,
  },
  {
    level: 11,
    title: "Investor",
    threshold: 3000000000,
    perks: ["Jewelry with emblem", "Monthly VIP bonus"],
    image: viplvl1,
  },
  {
    level: 12,
    title: "Founder",
    threshold: 4000000000,
    perks: ["Event invitations", "Annual Billionaire VIP Club meeting"],
    image: viplvl1,
  },
  {
    level: 13,
    title: "Bespoke Elite",
    threshold: 5000000000,
    perks: ["Custom rakeback", "Choose any rewards from previous levels"],
    image: viplvl1,
  },
  {
    level: 14,
    title: "Chairman",
    threshold: 7500000000,
    perks: ["Car, travel, and tech raffles", "Personal assistant"],
    image: viplvl1,
  },
  {
    level: 15,
    title: "Legend",
    threshold: 10000000000,
    perks: ["Unique profile", "Meet the founders", "Access to private chat"],
    image: viplvl1,
  },
];

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const VIPCard: React.FC<{
  level: number;
  title: string;
  threshold: number;
  perks: string[];
  // image: any;
}> = ({ level, title, threshold, perks }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formattedThreshold = mounted
    ? formatNumber(threshold)
    : threshold.toString();

  return (
    <div className="vip-card" data-level={level}>
      <div className="vip-card-header">
        <h2>{title}</h2>
        <div className="vip-level-badge">Level {level}</div>
      </div>
      <div className="vip-card-threshold">
        <span>Threshold: {formattedThreshold}$</span>
      </div>
      {/* <div className="vip-card-image">
        <Image
          src={image}
          alt={`VIP Level ${level} - ${title}`}
          // width={120}
          // height={120}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQvhwAAAABJRU5ErkJggg=="
        />
      </div> */}
      <ul className="vip-perks">
        {perks.map((perk, idx) => (
          <li key={idx}>• {perk}</li>
        ))}
      </ul>
      {/* <div className="vip-card-footer">
        <button
          className="vip-btn"
          aria-label={`See more about ${title} level`}
        >
          See more
        </button>
      </div> */}
    </div>
  );
};

const VIPPage: React.FC = () => {
  const { isOpen } = useSidebar();

  const vipGrid = useMemo(
    () => (
      <div className="vip-grid">
        {levels.map((levelData) => (
          <VIPCard key={levelData.level} {...levelData} />
        ))}
      </div>
    ),
    []
  );

  return (
    <div className={`container ${isOpen ? "container--unshifted" : ""}`}>
      <div className="vip-club">
        <TopSection
          caption="VIP Club"
          description="Explore our exclusive VIP levels and their benefits. Each level offers
          enhanced privileges and rewards based on your threshold."
        />

        {vipGrid}
      </div>
    </div>
  );
};

export default VIPPage;
