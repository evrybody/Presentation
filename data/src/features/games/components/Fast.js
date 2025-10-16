import React from "react";

import GameGrid from "@/features/GameGrid/GameGrid";
import { FastData } from "../data/FastData"

export default function FastGames() {
  return (
      <GameGrid games={FastData} id="fast" />
  );
}
