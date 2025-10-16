"use client";

import React, { useEffect } from "react";
import { useSidebar } from "@/features/Sidebar/SidebarContext";
import useAuthStore from "@/store/Auth/authStore";
import { useRouter } from "next/navigation";

import Image from "next/image";

import Payments from "@/features/Payments/Payment";
import LoginForm from "@/features/Auth/Login/LoginForm";

import DropDown from "@/features/Dropdown/Dropdown";

import RegistrationForm from "../Auth/Registration/Registration";

import Input from "@/features/Input/Input";

import logo from "@/assets/icons/Logo.svg";

import "./Header.css";

const Header: React.FC = () => {
  const { isOpen } = useSidebar();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const balance = useAuthStore((state) => state.balance);

  useEffect(() => {
    checkAuth();
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const goToMain = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    router.push("/");
  };

  const currencyToLocale: Record<string, string> = {
    USD: "en-US",
    EUR: "de-DE",
    GBP: "en-GB",
    RUB: "ru-RU",
    CNY: "zh-CN",
    JPY: "ja-JP",
  };

  const userCurrency = user?.currencyCode || "USD";

  const locale = currencyToLocale[userCurrency] || "en-US";

  const profileDropdownItems = [
    {
      text: "Profile",
      link: `/profile/${user?.id}`,
    },
    {
      text: "Promotions",
      link: "/qwe", //to do link to promotions page
    },
    {
      text: "VIP",
      link: "/vip",
    },
    {
      text: "Settings",
      link: "/profile/settings",
    },
    {
      text: "Logout",
      link: "#",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <header className={`header ${isOpen ? "header--unshifted" : ""}`}>
        <div className="header_logo_wrapper">
          <button className="header__logo__btn" onClick={goToMain}>
            <Image
              src={logo}
              alt="Gamble"
              className="header__logo"
              draggable={false}
              priority={true}
              height={40}
              style={{ width: "auto" }}
            />
          </button>
        </div>

        <div className="input_field">
          <Input />
        </div>

        {isAuthenticated ? (
          <div className="end_form">
            <div>
              <span className="gold-gradient">
                Balance:{" "}
                {new Intl.NumberFormat(locale, {
                  style: "currency",
                  currency: userCurrency,
                }).format(balance)}
              </span>
            </div>

            <div className="end_form">
              <Payments />
            </div>
            <DropDown title="Profile" link="#" items={profileDropdownItems} />
          </div>
        ) : (
          <div className="end_form">
            <LoginForm />
            <RegistrationForm />
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
