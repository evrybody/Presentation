"use client";

import React from "react";

import Fast from "@/features/games/components/Fast";
import Bonuses from "@/features/games/components/Bonuses";
import Slots from "@/features/games/components/Slots";
import Live from "@/features/games/components/Live";

import { ProvidersData } from "@/features/ProvidersCarousel/ProvidersData";

import GamesSection from "../GameSection";

const mainSections = [
  { title: "Slots", href: "/slots", Component: Slots },
  { title: "Bonuses", href: "/slots/bonuses", Component: Bonuses },
  { title: "Fast", href: "/slots/fast", Component: Fast },
  { title: "Live", href: "/live", Component: Live },
];

const MainSection = () => (
  <GamesSection sections={mainSections} providers={ProvidersData} />
);

export default MainSection;
