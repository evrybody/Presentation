import { TabItem } from "@/features/TabbedPage/TabbedPage";
import dynamic from "next/dynamic";

import liveGamesGreen from "@/assets/icons/LiveGamesGreen.svg";

export const LIVE_TABS: TabItem[] = [
  {
    id: "live",
    label: "Live Games",
    icon: liveGamesGreen,
    href: "/live",
    component: dynamic(() => import("@/app/slots/components/BonusesGrid")), //to do rework
  },
  {
    id: "show",
    label: "Live Show",
    icon: liveGamesGreen,
    href: "/live/show",
    component: dynamic(() => import("@/app/slots/components/BonusesGrid")), //to do rework
  },
] as const;

export type LiveTabId = (typeof LIVE_TABS)[number]["id"];
