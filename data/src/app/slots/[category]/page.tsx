"use client";

import React, { use } from "react";

import dynamic from "next/dynamic";

const CATEGORY_COMPONENTS: Record<string, React.ComponentType> = {
  popular: dynamic(() => import("../components/PopularGrid")),
  fast: dynamic(() => import("../components/FastGamesGrid")),
  novelties: dynamic(() => import("../components/NoveltyGrid")),
  bonuses: dynamic(() => import("../components/BonusesGrid")),
  rtp: dynamic(() => import("../components/RtpGrid")),
  slots: dynamic(() => import("../components/SlotsGrid")),
};

export default function SlotCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  const GridComponent = CATEGORY_COMPONENTS[category];

  return (
    <div>
      <GridComponent />
    </div>
  );
}
