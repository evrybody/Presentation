"use client";

import React from "react";

import ItemGrid from "@/features/ItemGrid/ItemGrid";

import { LiveData } from "@/features/games/data/LiveData";

export default function LiveSection() {
  return <ItemGrid games={LiveData} type="games" itemsPerPage={21} />;
}
