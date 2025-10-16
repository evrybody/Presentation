"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useSidebar } from "@/features/Sidebar/SidebarContext";
import useAuthStore from "@/store/Auth/authStore";

import { TabId, tabs, TabComponents } from "./affilate.config";
import styles from "./styles.module.css";

export default function Affiliate() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const { isOpen } = useSidebar();

  const visibleTabs = isAuthenticated
    ? tabs
    : tabs.filter((t) => t.id === "overview");
  const ActiveTabComponent = TabComponents[activeTab];

  const handleTabChange = (id: TabId) => {
    if (!isAuthenticated && id !== "overview") return;
    setActiveTab(id);
  };

  return (
    <div
      className={`${styles.affiliatePageWrapper} ${
        isOpen ? styles.affiliatePageUnshifted : ""
      }`}
    >
      <div className={styles.affilatePage}>
        <TabsMenu
          tabs={visibleTabs}
          activeTab={activeTab}
          onChange={handleTabChange}
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
              <ActiveTabComponent
                {...(activeTab === "overview" ? { setActiveTab } : {})}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* локальный подкомпонент меню */
function TabsMenu({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: {
    id: TabId;
    label: string;
    icon: React.ComponentType<{ size?: number }>;
  }[];
  activeTab: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <div className={styles.menu}>
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={`${styles.tabButton} ${
            activeTab === id ? styles.active : ""
          }`}
          onClick={() => onChange(id)}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
