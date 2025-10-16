import React from "react";

import GameGrid from "@/features/GameGrid/GameGrid";
import { SlotsData } from "../data/SlotsData";

export default function Slots() {
  return <GameGrid games={SlotsData.slice(0, 20)} id="slots"/>;
}
