"use client";

import React, { Suspense } from "react";
import { useSidebar } from "@/features/Sidebar/SidebarContext";
import TabbedPage from "@/features/TabbedPage/TabbedPage";
import { SLOTS_TABS } from "./slotsTabsConfig";
import Loading from "@/app/loading";
import style from "./page.module.css";

const SectionLoader = () => (
  <div className={style.sectionLoader}>
    <Loading />
  </div>
);

export default function SlotsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useSidebar();

  return (
    <div
      className={`${style.slot_page_wrapper} ${
        isOpen ? style["slot_page_wrapper--unshifted"] : ""
      }`}
    >
      <div className={style.page_navigation}>
        <TabbedPage
          title="Slots"
          description="Enjoy the Best Selection of Slot Games Right Here!"
          tabs={SLOTS_TABS}
          defaultTab="slots"
        />
      </div>
      <div className={style.page_content}>
        <Suspense fallback={<SectionLoader />}>{children}</Suspense>
      </div>
    </div>
  );
}
