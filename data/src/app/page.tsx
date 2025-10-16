"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";

import Image from "next/image";

import Navigation, { navItems } from "@/features/Navigation/Navigation";
import { useSidebar } from "@/features/Sidebar/SidebarContext";

import welcomeImg from "@/assets/imgs/welcomeImg.png";
import reasonsImg from "@/assets/imgs/reasonsImg.png";

import Promo from "@/features/Promotions/Promo";

import styles from "./page.module.css";

const MainSection = dynamic(
  () => import("@/features/Sections/Main/MainSection"),
  {
    loading: () => <SectionLoader />,
  }
);

const SlotSection = dynamic(
  () => import("@/features/Sections/SlotSection/SlotSection"),
  {
    loading: () => <SectionLoader />,
  }
);

const LiveSection = dynamic(
  () => import("@/features/Sections/LiveGames/LiveSection"),
  {
    loading: () => <SectionLoader />,
  }
);

const TableSection = dynamic(
  () => import("@/features/Sections/TableSection/TableSection"),
  {
    loading: () => <SectionLoader />,
  }
);

const preloadComponents = {
  Slots: () => import("@/features/Sections/SlotSection/SlotSection"),
  Live: () => import("@/features/Sections/LiveGames/LiveSection"),
  Table: () => import("@/features/Sections/TableSection/TableSection"),
};

const SectionLoader = () => (
  <div className={styles.sectionLoader}>
    <div className={styles.loaderSpinner}></div>
    <p>Loading games...</p>
  </div>
);

export default function Home() {
  const { isOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState(navItems[0].id);

  const handleTabHover = (tabId: string) => {
    if (
      tabId !== activeTab &&
      preloadComponents[tabId as keyof typeof preloadComponents]
    ) {
      preloadComponents[tabId as keyof typeof preloadComponents]();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Lobby":
        return (
          <Suspense fallback={<SectionLoader />}>
            <MainSection />
          </Suspense>
        );
      case "Slots":
        return (
          <Suspense fallback={<SectionLoader />}>
            <SlotSection />
          </Suspense>
        );
      case "Live":
        return (
          <Suspense fallback={<SectionLoader />}>
            <LiveSection />
          </Suspense>
        );
      case "Table":
        return (
          <Suspense fallback={<SectionLoader />}>
            <TableSection />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<SectionLoader />}>
            <MainSection />
          </Suspense>
        );
    }
  };

  return (
    <div className={styles.page}>
      <div className={`${styles.main} ${isOpen ? styles.shifted : ""}`}>
        <div className={styles.meeting_section}>
          <div className={styles.l_meeting}>
            <Image
              src={welcomeImg}
              alt="Before death, any defeat is psychological"
              loading="eager"
              fill
              draggable={false}
              style={{
                objectFit: "fill",
                objectPosition: "center",
                borderRadius: "8px",
                userSelect: "none",
              }}
            />
          </div>
          <div className={styles.meeting}>
            <Promo />
          </div>
          <div className={styles.r_meeting}>
            <Image
              src={reasonsImg}
              alt="Some reasons you should play with us"
              loading="eager"
              draggable={false}
              fill
              style={{
                objectFit: "fill",
                objectPosition: "center",
                borderRadius: "8px",
                userSelect: "none",
              }}
            />
          </div>
        </div>
        <div className={styles.navigation}>
          <Navigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onTabHover={handleTabHover}
          />
        </div>
        <div className={styles.slots}>{renderContent()}</div>
      </div>
    </div>
  );
}
