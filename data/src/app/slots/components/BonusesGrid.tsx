"use client";

import React from "react";
import ItemGrid from "@/features/ItemGrid/ItemGrid";
import { BonusesData } from "@/features/games/data/BonusesData";

const BonusesGrid = () => {
  return <ItemGrid games={BonusesData} type="games" itemsPerPage={21} />;
};

export default BonusesGrid;
