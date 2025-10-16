import React from "react";

import { SettingsTabGeneral } from "@/features/Settings/tabs/general";
import { SettingsTabSecurity } from "@/features/Settings/tabs/security";
import { SettingsTabBlocking } from "@/features/Settings/tabs/blocking";
import { OverviewProps } from "@/app/affilate/affilate.config";

export type SettingsTabId = "general" | "security" | "blocking";

export const settingsTabs: { id: SettingsTabId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "blocking", label: "Blocking" },
];

export const SettingsTabComponents: Record<
  SettingsTabId,
  React.ComponentType<OverviewProps>
> = {
  general: SettingsTabGeneral,
  security: SettingsTabSecurity,
  blocking: SettingsTabBlocking,
};
export const LineSvg = () => (
  <svg width="100%" height="4" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 3H1828"
      stroke="url(#paint0_linear_286_106)"
      strokeWidth="1"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient
        id="paint0_linear_286_106"
        x1="0%"
        y1="1"
        x2="100%"
        y2="100"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FED253" stopOpacity="0" />
        <stop offset="0.25" stopColor="#FED253" />
        <stop offset="0.50" stopColor="#F4E0AD" />
        <stop offset="0.75" stopColor="#FED253" />
        <stop offset="1" stopColor="#FED253" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);
