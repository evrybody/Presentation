"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useSidebar } from "@/features/Sidebar/SidebarContext";
import styles from "./Settings.module.css";

import {
  settingsTabs,
  SettingsTabId,
  SettingsTabComponents,
} from "@/features/Settings/settings.config";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTabId>("general");
  const { isOpen } = useSidebar();

  const ActiveTabComponent = SettingsTabComponents[activeTab];

  return (
    <div
      className={`${styles.profileContainer} ${
        isOpen ? styles["profileContainer--unshifted"] : ""
      }`}
    >
      <div className={styles.profileCard}>
        <div className={styles.profileContentWrapper}>
          <TabsMenu
            tabs={settingsTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />

          <div className={styles.content}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <ActiveTabComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabsMenu({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { id: SettingsTabId; label: string }[];
  activeTab: SettingsTabId;
  onChange: (id: SettingsTabId) => void;
}) {
  return (
    <aside className={styles.sidebar}>
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          className={`${styles.menuItem} ${
            activeTab === id ? styles.active : ""
          }`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </aside>
  );
}
