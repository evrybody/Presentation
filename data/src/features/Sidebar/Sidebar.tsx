"use client";

import { useSidebar } from "./SidebarContext";

import useAuthStore from "@/store/Auth/authStore";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import React, { useState, useEffect, useMemo } from "react";
import { AlertProps } from "../Alert/Alert";

import Image from "next/image";
import Link from "next/link";

const CustomAlert = dynamic(() => import("../Alert/Alert"));

import G_ICON from "@/assets/icons/G.svg";
import LIVE_ICON_2 from "@/assets/icons/LiveGames2.svg";
import ENHANCHED_ICON from "@/assets/icons/Enhanched.svg";
import PROMOTIONS_ICON from "@/assets/icons/Promotions.svg";
import VIP_ICON from "@/assets/icons/VIP.svg";
import RESPONSIBLE_ICON from "@/assets/icons/Responsible.svg";
import FAVORITES_ICON from "@/assets/icons/Favorites.svg";
import CHALLENGES_ICON from "@/assets/icons/Challenges.svg";
// import RECENT_ICON from "@/assets/icons/Recent.svg";
// import HISTORY_ICON from "@/assets/icons/History.svg";
import SLOTS_ICON from "@/assets/icons/Slots.svg";
import FAST_ICON from "@/assets/icons/Fast_icon.svg";
import POPULAR_ICON from "@/assets/icons/Popular.svg";
import PROVIDERS_ICON from "@/assets/icons/Providers.svg";
import LIVESHOW_ICON from "@/assets/icons/LiveShow.svg";
import NOVELTIES_ICON from "@/assets/icons/Novelties.svg";
import BONUSES_ICON from "@/assets/icons/Bonuses.svg";
import POKER_ICON from "@/assets/icons/Poker.svg";
import AFFILATE_ICON from "@/assets/icons/Affilate.svg";
import BLACKJACK_ICON from "@/assets/icons/Blackjack.svg";
import BACCARAT_ICON from "@/assets/icons/Baccarat.svg";
import ROULETTTE_ICON from "@/assets/icons/Roulette.svg";
import CONTACT_ICON from "@/assets/icons/Contact.svg";

import "./Sidebar.css";

interface MenuItem {
  title: string;
  content: React.ReactNode;
  href: string;
  category: string | null;
  icon?: string | null;
  mobileOnly?: boolean;
  desktopOnly?: boolean;
  requiresAuth?: boolean;
}

interface SidebarProps {
  username?: string;
}

const Sidebar: React.FC<SidebarProps> = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        title: "Favorites",
        content: <p>Favorites</p>,
        href: "/qwe",
        category: "user",
        icon: FAVORITES_ICON,
        desktopOnly: true,
        requiresAuth: true,
      },
      // {
      //   title: "Recent",
      //   content: <p>Recent</p>,
      //   href: "/qwe",
      //   category: "user",
      //   icon: RECENT_ICON,
      //   desktopOnly: true,
      //   requiresAuth: true,
      // },
      {
        title: "Challenges",
        content: <p>Challenges</p>,
        href: "/challenges",
        category: "user",
        icon: CHALLENGES_ICON,
        desktopOnly: true,
        requiresAuth: true,
      },
      // {
      //   title: "History",
      //   content: <p>History</p>,
      //   href: "/qwe",
      //   category: "user",
      //   icon: HISTORY_ICON,
      //   desktopOnly: true,
      //   requiresAuth: true,
      // },

      {
        title: "Slots",
        content: <p>Slots</p>,
        href: "/slots",
        category: "game",
        icon: SLOTS_ICON,
      },
      {
        title: "Popular",
        content: <p>Popular</p>,
        href: "/slots/popular",
        category: "game",
        icon: POPULAR_ICON,
        desktopOnly: true,
      },
      {
        title: "Providers",
        content: <p>Providers</p>,
        href: "/providers",
        category: "providers",
        icon: PROVIDERS_ICON,
      },
      {
        title: "Promotions",
        content: <p>Promotions</p>,
        href: "/qwe",
        category: "promotions",
        icon: PROMOTIONS_ICON,
      },
      {
        title: "Affilate",
        content: <p>Affilate</p>,
        href: "/affilate",
        category: "shares",
        icon: AFFILATE_ICON,
      },
      {
        title: "VIP",
        content: <p>VIP</p>,
        href: "/vip",
        category: "shares",
        icon: VIP_ICON,
      },
      {
        title: "Responsible Gambling",
        content: <p>Responsible Gambling</p>,
        href: "/contactUs?activeContent=responsible",
        category: "rules",
        icon: RESPONSIBLE_ICON,
      },
      {
        title: "Novelties",
        content: <p>Novelties</p>,
        href: "/slots/novelties",
        category: "game",
        icon: NOVELTIES_ICON,
        desktopOnly: true,
      },
      {
        title: "Fast Games",
        content: <p>Fast Games</p>,
        href: "/slots/fast",
        category: "game",
        icon: FAST_ICON,
      },
      {
        title: "Buy Bonuses",
        content: <p>Buy Bonuses</p>,
        href: "/slots/bonuses",
        category: "game",
        icon: BONUSES_ICON,
        desktopOnly: true,
      },
      {
        title: "Enhanched RTP",
        content: <p>Enhanched RTP</p>,
        href: "/slots/rtp",
        category: "game",
        icon: ENHANCHED_ICON,
        desktopOnly: true,
      },
      {
        title: "Live Games",
        content: <p>Live Games</p>,
        href: "/live",
        category: "game",
        icon: LIVE_ICON_2,
      },
      {
        title: "Live Show",
        content: <p>Live Show</p>,
        href: "/live/show",
        category: "game",
        icon: LIVESHOW_ICON,
        desktopOnly: true,
      },
      {
        title: "Poker",
        content: <p>Poker</p>,
        href: "/table/poker",
        category: "game",
        icon: POKER_ICON,
        desktopOnly: true,
      },
      {
        title: "Blackjack",
        content: <p>Blackjack</p>,
        href: "/table/blackjack",
        category: "game",
        icon: BLACKJACK_ICON,
        desktopOnly: true,
      },
      {
        title: "Baccarat",
        content: <p>Baccarat</p>,
        href: "/table/baccarat",
        category: "game",
        icon: BACCARAT_ICON,
        desktopOnly: true,
      },
      {
        title: "Roulette",
        content: <p>Roulette</p>,
        href: "/table/roulette",
        category: "game",
        icon: ROULETTTE_ICON,
        desktopOnly: true,
      },
      {
        title: "Contact us",
        content: <p>Contact us</p>,
        href: "/contactUs",
        category: "rules",
        icon: CONTACT_ICON,
        desktopOnly: true,
      },
      {
        title: "Mobile Support",
        content: <p>Support</p>,
        href: "/contactUs",
        category: "rules",
        icon: null,
        mobileOnly: true,
      },
      {
        title: "Mobile Menu",
        content: <p>↓</p>,
        href: "",
        category: null,
        icon: null,
        mobileOnly: true,
      },
    ],
    []
  );

  const { mobileMenuItems, desktopMenuItems } = useMemo(() => {
    const mobile = menuItems.filter(
      (item) => item.mobileOnly || (!item.mobileOnly && !item.desktopOnly)
    );
    const desktop = menuItems.filter(
      (item) => item.desktopOnly || (!item.mobileOnly && !item.desktopOnly)
    );

    return { mobileMenuItems: mobile, desktopMenuItems: desktop };
  }, [menuItems]);

  const filteredItems = useMemo(
    () => (isMobile ? mobileMenuItems : desktopMenuItems),
    [isMobile, mobileMenuItems, desktopMenuItems]
  );

  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};

    filteredItems.forEach((item) => {
      const category = item.category || "uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(item);
    });

    return groups;
  }, [filteredItems]);

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [alert, setAlert] = useState<AlertProps | null>(null);

  const profileClick = () => {
    setAlert({ type: "warning", message: "You are not authorized" });
  };

  const mobileQuickItems = useMemo(
    () => [
      { title: "Quick Home", content: "Home", href: "/" },
      { title: "Quick Slots", content: "Slots", href: "/slots" },
      {
        title: "Quick Menu",
        content: (
          <Image src={G_ICON} alt="G" loading="lazy" draggable={false} />
        ),
        href: "",
        onClick: toggleSidebar,
      },
      isAuthenticated
        ? {
            title: "Quick Profile",
            content: "Profile",
            href: `/profile/${encodeURIComponent(user?.name || "")}`,
          }
        : {
            title: "Quick Profile",
            content: "Profile",
            href: "",
            onClick: profileClick,
          },
      { title: "Quick Support", content: "Help", href: "/contactUs" },
    ],
    [toggleSidebar, isAuthenticated, user]
  );

  const renderMobileSidebar = () => (
    <div className={`sidebar__mobile ${isOpen ? "sidebar__mobile__open" : ""}`}>
      {isOpen ? (
        <ul className="sidebar__list__mobile">
          {filteredItems.map(({ title, content, href }) => (
            <li className="sidebar__item__mobile" key={title}>
              <Link className="sidebar__link__mobile" href={href}>
                <span
                  className="sidebar__span__mobile"
                  role="button"
                  aria-label="Open menu"
                  onClick={toggleSidebar}
                >
                  {content}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="sidebar__list__mobile_closed">
          {mobileQuickItems.map(({ title, content, href, onClick }) => (
            <li className="sidebar__item__mobile_closed" key={title}>
              {href ? (
                <Link className="sidebar__link__mobile" href={href}>
                  <span className="sidebar__span__mobile_closed">
                    {content}
                  </span>
                </Link>
              ) : (
                <Link className="sidebar__link__mobile" href="">
                  <span
                    className="sidebar__span__mobile_closed"
                    onClick={onClick}
                  >
                    {content}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const renderDesktopSidebar = () => (
    <div className="sidebar_wrapper">
      <div className={`sidebar__wrapper ${isOpen ? "sidebar--open" : ""}`}>
        <label className="bar">
          <input
            type="checkbox"
            checked={isOpen}
            onChange={toggleSidebar}
            readOnly={false}
            aria-label="Toggle sidebar"
          />
          <span className="top"></span>
          <span className="middle"></span>
          <span className="bottom"></span>
        </label>

        <aside className="sidebar">
          <ul className="sidebar__list">
            {Object.entries(groupedItems).map(([category, items]) => (
              <li
                key={category}
                style={{
                  backgroundColor: "#03322b",
                  marginBottom: "12px",
                  borderRadius: "8px",
                }}
              >
                <ul className="sidebar__list">
                  {items.map(({ title, content, href, icon, requiresAuth }) =>
                    requiresAuth && !isAuthenticated ? null : (
                      <li className="sidebar__item" key={title}>
                        <Link
                          className={`sidebar__link ${
                            pathname === href ? "sidebar__link--active" : ""
                          }`}
                          href={href}
                        >
                          {icon && (
                            <Image
                              src={icon}
                              alt=""
                              loading="lazy"
                              draggable={false}
                              width={20}
                            />
                          )}
                          <span className="sidebar__name">{content}</span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );

  return (
    <>
      {isMobile ? renderMobileSidebar() : renderDesktopSidebar()}
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
};

export default Sidebar;
