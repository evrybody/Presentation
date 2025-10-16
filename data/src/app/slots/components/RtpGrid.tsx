"use client";

import React from "react";
import ItemGrid from "@/features/ItemGrid/ItemGrid";
import { SlotsData } from "@/features/games/data/SlotsData";

const RtpGrid = () => {
  return <ItemGrid games={SlotsData} type="games" itemsPerPage={21} />;
};

export default RtpGrid;
