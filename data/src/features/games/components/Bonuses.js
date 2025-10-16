import React from "react";

import GameGrid from "@/features/GameGrid/GameGrid";
import { BonusesData } from "../data/BonusesData";

export default function Bonuses() {
  return <GameGrid games={BonusesData} id="bonuses" />;
}
