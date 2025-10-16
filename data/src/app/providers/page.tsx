"use client";

import React from "react";
import { useSidebar } from "@/features/Sidebar/SidebarContext";
import ItemGrid from "@/features/ItemGrid/ItemGrid";
import { ProvidersData } from "@/features/ProvidersCarousel/ProvidersData";

import TopSection from "@/features/TopSection/topSection";

import "./page.css";

const Providers: React.FC = () => {
  const { isOpen } = useSidebar();
  return (
    <div className={`container ${isOpen ? "container--unshifted" : ""}`}>
      <TopSection caption="Providers" description=""/>
      <div className="provider-wrapper">
        <ItemGrid
          games={ProvidersData}
          type="providers"
          itemsPerPage={ProvidersData.length}
        />
      </div>
    </div>
  );
};

export default Providers;
