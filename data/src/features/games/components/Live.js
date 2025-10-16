import React from "react";

import GameGrid from "@/features/GameGrid/GameGrid";
import { LiveData } from "../data/LiveData";

export default function Live() {
  return <GameGrid games={LiveData} id="live" />;
}
