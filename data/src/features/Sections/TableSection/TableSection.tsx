"use client";

import React from "react";

import ItemGrid from "@/features/ItemGrid/ItemGrid";

import { TableData } from "@/features/games/data/TableData";

export default function TableSection() {
  return <ItemGrid games={TableData} type="games" itemsPerPage={21} />;
}
