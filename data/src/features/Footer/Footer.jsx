"use client";

import React from "react";

import logo from "@/assets/icons/Logo.svg";
import telegramIcon from "@/assets/icons/telegram.svg";
import twitterIcon from "@/assets/icons/x.svg";
import instagramIcon from "@/assets/icons/instagram.svg";

import Image from "next/image";
import Link from "next/link";

import { buttons } from "@/app/contactUs/ContactUsData";
import { useSidebar } from "@/features/Sidebar/SidebarContext";

import "./Footer.css";

export default function Footer() {
  const { isOpen } = useSidebar();
  return (
    <footer className={`Footer ${isOpen ? "Footer--unshifted" : ""}`}>
      <svg
        width="100%"
        height="4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
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
      <div className="FooterContent">
        <div className="FooterSection LogoPartnership">
          <Image
            src={logo}
            alt="Gamble Casino"
            className="FooterLogo"
            width={150}
            style={{ marginBottom: "1rem" }}
            loading="lazy"
          />
          {/* <button className="AffiliateButton">Affiliate Program</button> */}
        </div>

        <div className="FooterSection Rules">
          <h3>Rules & Terms</h3>
          <ul>
            {buttons.map(({ label, value }) => (
              <li key={value}>
                <Link
                  href={{
                    pathname: "/contactUs",
                    query: { activeContent: value },
                  }}
                >
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="FooterSection Contact">
          <h3>Contact Us</h3>
          <Link
            href={{
              pathname: "/contactUs",
              query: { activeContent: "contact" },
            }}
            style={{ textDecoration: "none", color: "white", padding: 0 }}
          >
            <span>Contact us</span>
          </Link>

          <span>Email: support@gamblecasino.com</span>
          <span>
            Telegram:{" "}
            <Link href="https://t.me/gamblecasino" style={{textDecoration: "none", color: "var(--yellow)"}}>
              @gamblecasino
            </Link>
          </span>
        </div>

        <div className="FooterSection SocialMedia">
          <h3>Follow Us</h3>
          <div className="SocialIcons">
            <a href="https://web.telegram.org/k/#-1237513492">
              <Image
                src={telegramIcon}
                alt="Telegram"
                loading="lazy"
                width={32}
              />
            </a>
            <a href="https://twitter.com">
              <Image src={twitterIcon} alt="X" loading="lazy" width={32} />
            </a>
            <a href="https://instagram.com">
              <Image
                src={instagramIcon}
                alt="Instagram"
                loading="lazy"
                width={32}
              />
            </a>
          </div>
        </div>
      </div>

      <div className="BottomCaption">
        <span>&copy; 2025 Gamble Casino. All rights reserved.</span>
      </div>
    </footer>
  );
}
