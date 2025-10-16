"use client";

import React from "react";

import { useSidebar } from "@/features/Sidebar/SidebarContext";

import styles from "./page.module.css";

export default function NotFound() {
  const { isOpen } = useSidebar();
  return (
    <div className={`container ${isOpen ? "container--unshifted" : ""}`}>
      <div className={styles.notFound}>
        <h1 className="gold-gradient" style={{ fontSize: 128 }}>
          404
        </h1>
        <span className="gold-gradient" style={{ fontSize: 64 }}>
          Page not found
        </span>
      </div>
    </div>
  );
}
