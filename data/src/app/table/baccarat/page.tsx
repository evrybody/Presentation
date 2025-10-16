"use client";

import React from "react";
import TabbedPage from "@/features/TabbedPage/TabbedPage";
import { TABLE_TABS } from "../tableTabsConfig";

export default function SlotsPage() {
  return (
    <TabbedPage
      title="Baccarat"
      description="Enjoy the Best Selection of Slot Games Right Here!"
      tabs={TABLE_TABS}
      defaultTab={"baccarat"}
    />
  );
}
