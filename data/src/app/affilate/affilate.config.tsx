import React from "react";
import dynamic from "next/dynamic";

import Loading from "../loading";

import {
  Infinity,
  Percent,
  Settings,
  Coins,
  Globe,
  LayoutDashboard,
  Megaphone,
  Wallet,
  Users,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export type Advantage = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export const advantages: Advantage[] = [
  {
    icon: Infinity,
    title: "Lifetime Commission",
    desc: "If the people you refer keep playing, you keep getting paid.",
  },
  {
    icon: Percent,
    title: "Market Leading Player Value",
    desc: "Grow your earnings with some of the highest returns offered to players.",
  },
  {
    icon: Settings,
    title: "Customise Your Commission",
    desc: "Tailor your commission plan to fit your unique business needs.",
  },
  {
    icon: Coins,
    title: "Crypto & Local Currencies",
    desc: "Earn your way with support for both cryptocurrency and local currencies.",
  },
  {
    icon: Globe,
    title: "24x7 Multi Language Support",
    desc: "Get the help you want in your preferred language all day, everyday.",
  },
];

export type TabId =
  | "overview"
  | "campaigns"
  | "commissions"
  | "referrals"
  | "faq";

export type OverviewProps = {
  setActiveTab?: React.Dispatch<React.SetStateAction<TabId>>;
};

export const TabComponents: Record<
  TabId,
  React.ComponentType<OverviewProps>
> = {
  overview: dynamic(() => import("./tabs/overview"), {
    loading: () => <Loading />,
  }),
  campaigns: dynamic(() => import("./tabs/campaigns"), {
    loading: () => <Loading />,
  }),
  commissions: dynamic(() => import("./tabs/commissions"), {
    loading: () => <Loading />,
  }),
  referrals: dynamic(() => import("./tabs/referrals"), {
    loading: () => <Loading />,
  }),
  faq: dynamic(() => import("./tabs/faq"), {
    loading: () => <Loading />,
  }),
};

export const tabs: {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "commissions", label: "Commissions", icon: Wallet },
  { id: "referrals", label: "Referrals", icon: Users },
  { id: "faq", label: "FAQ", icon: HelpCircle },
];
