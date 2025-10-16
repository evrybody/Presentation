"use client";

import React from "react";
import Image from "next/image";

import sevensGreen from "@/assets/icons/sevensGreen.svg"
import liveGamesGreen from "@/assets/icons/LiveGamesGreen.svg";
import tableGamesGreen from "@/assets/icons/tableGamesGreen.svg"
import GCGreen from "@/assets/icons/GCGreen.svg";

import "./Navigation.css";

export const navItems = [
    { id: "Lobby", label: "Lobby", icon: GCGreen },
    { id: "Slots", label: "Slots", icon: sevensGreen },
    { id: "Live", label: "Live Games", icon: liveGamesGreen },
    { id: "Table", label: "Table Games", icon: tableGamesGreen },
];

interface NavigationProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onTabHover?: (tabId: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab, onTabHover }) => {
    return (
        <nav className="nav">
            <ul>
                {navItems.map((item) => (
                    <li key={item.id}>
                        <button
                            className={activeTab === item.id ? "active" : ""}
                            onClick={() => setActiveTab(item.id)}
                            onMouseEnter={() => onTabHover?.(item.id)}
                        > 
                            <Image
                                src={item.icon}
                                loading="lazy"
                                alt={item.label}
                                draggable={false}
                                className="nav__icon"
                                style={{
                                    width: 32,
                                    height: 32,
                                    flexShrink: 0
                                }}
                            />
                            {activeTab === item.id ? item.label : ""}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation;