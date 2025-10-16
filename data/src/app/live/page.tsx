"use client";

import React from "react";

import TabbedPage from "@/features/TabbedPage/TabbedPage";
import { LIVE_TABS } from "./liveTabsConfig";

import ItemGrid from "@/features/ItemGrid/ItemGrid";
import { SlotsData } from "@/features/games/data/SlotsData";

import { useSidebar } from "@/features/Sidebar/SidebarContext";

import style from "../slots/page.module.css";

export default function LivePage() {
  const { isOpen } = useSidebar();
  return (
    <div
      className={`${style.slot_page_wrapper} ${
        isOpen ? style["slot_page_wrapper--unshifted"] : ""
      }`}
    >
      <div className={style.page_navigation}>
        <TabbedPage
          title="Live Games"
          description="Enjoy the Best Selection of Live Games!"
          tabs={LIVE_TABS}
          defaultTab={"live"}
        />
      </div>
      <div className={style.page_content}>
        <ItemGrid games={SlotsData} type="games" itemsPerPage={18} />
      </div>
    </div>
  );
}
