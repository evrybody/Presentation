"use client";

import React from "react";
import { SLOTS_TABS } from "./slotsTabsConfig";

export default function SlotsPage() {
  const RootComponent = SLOTS_TABS.find((tab) => tab.id === "slots")!.component;
  return <RootComponent />;
}
