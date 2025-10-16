import { TabItem } from "@/features/TabbedPage/TabbedPage";

import dynamic from "next/dynamic";

import sevensGreen from "@/assets/icons/sevensGreen.svg";
import popularGreen from "@/assets/icons/popularGreen.svg";
import noveltiesGreen from "@/assets/icons/noveltiesGreen.svg";
import fastGreen from "@/assets/icons/fastGreen.svg";
import bonusesGreen from "@/assets/icons/BonusesGreen.svg";
import rtpGreen from "@/assets/icons/rtpGreen.svg";

export const SLOTS_TABS: TabItem[] = [
  {
    id: "slots",
    label: "Slots",
    icon: sevensGreen,
    href: "/slots",
    component: dynamic(() => import("./components/SlotsGrid")),
  },
  {
    id: "popular",
    label: "Popular",
    icon: popularGreen,
    href: "/slots/popular",
    component: dynamic(() => import("./components/PopularGrid")),
  },
  {
    id: "novelties",
    label: "Novelties",
    icon: noveltiesGreen,
    href: "/slots/novelties",
    component: dynamic(() => import("./components/NoveltyGrid")),
  },
  {
    id: "fast",
    label: "Fast Games",
    icon: fastGreen,
    href: "/slots/fast",
    component: dynamic(() => import("./components/FastGamesGrid")),
  },
  {
    id: "bonuses",
    label: "Buy Bonuses",
    icon: bonusesGreen,
    href: "/slots/bonuses",
    component: dynamic(() => import("./components/BonusesGrid")),
  },
  {
    id: "rtp",
    label: "Enhanched RTP",
    icon: rtpGreen,
    href: "/slots/rtp",
    component: dynamic(() => import("./components/RtpGrid")),
  },
] as const;

export type SlotsTabId = (typeof SLOTS_TABS)[number]["id"];
