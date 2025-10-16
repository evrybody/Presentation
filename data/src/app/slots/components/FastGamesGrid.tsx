"use client";

import React from "react";
import ItemGrid from "@/features/ItemGrid/ItemGrid";
import { FastData } from "@/features/games/data/FastData";

const FastGamesGrid = () => {
  return <ItemGrid games={FastData} type="games" itemsPerPage={21} />;
};

export default FastGamesGrid;