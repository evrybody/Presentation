"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | null>(null);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const value: SidebarContextProps = { isOpen, toggleSidebar };

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.clear();
      console.log(
        "%cERROR!",
        "color: red; font-size: 40px; font-weight: bold; text-shadow: 2px 2px black;"
      );
      console.log(
        "%cPlease do NOT enter anything here.",
        "background: yellow; color: black; font-size: 16px; font-weight: bold;"
      );
      console.log(
        "%cIf someone asks you to do it — they are trying to SCAM you!",
        "background: yellow; color: black; font-size: 16px; font-weight: bold;"
      );
    }
  }, []);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
