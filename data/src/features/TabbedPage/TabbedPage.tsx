"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/features/Sidebar/SidebarContext";
import Image, { StaticImageData } from "next/image";
import styles from "./TabbedPage.module.css";

export interface TabItem {
  id: string;
  label: string;
  icon: StaticImageData | string;
  href: string;
  component: React.ComponentType<unknown>;
}

interface TabbedPageProps {
  title: string;
  description: string;
  tabs: TabItem[];
  defaultTab: string;
  onTabHover?: (tabId: string) => void;
}

const TabbedPage = ({ tabs, defaultTab, onTabHover }: TabbedPageProps) => {
  const { isOpen } = useSidebar();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];

    const currentTab = tabs.find((tab) => {
      return tab.id === lastPart;
    });

    setActiveTab(currentTab?.id || defaultTab);
  });

  console.log("Active tab is: ", activeTab);

  return (
    <div
      className={`${styles.tabbed__wrapper} ${isOpen ? styles.unshifted : ""}`}
    >
      <nav className={styles.nav}>
        <ul>
          {tabs.map((tab) => (
            <li key={tab.id} className={styles.nav__item}>
              <Link
                href={tab.href}
                className={`${styles.nav__link} ${
                  activeTab === tab.id ? styles.active : ""
                }`}
                onMouseEnter={() => onTabHover?.(tab.id)}
              >
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  className={styles.nav__icon}
                  draggable={false}
                  style={{
                    width: 32,
                    height: 32,
                    flexShrink: 0,
                  }}
                />
                <span className={styles.label}>{tab.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TabbedPage;
