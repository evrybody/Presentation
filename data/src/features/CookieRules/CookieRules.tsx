"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "./CookieRules.css";

const handleAcceptCookie = (
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("acceptCookie", "true");
    setAccepted(true);
  }
};

export default function CookieRules() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookieAccepted = localStorage.getItem("acceptCookie");
      if (cookieAccepted === "true") {
        setAccepted(true);
      }
    }
  }, []);

  if (accepted) {
    return null;
  }

  return (
    <div className="cookie__wrapper">
      <div className="cookie__text">
        <span className="gold-gradient">We use</span>
        <span> </span>
        <Link
          href={{
            pathname: "/contactUs",
            query: { activeContent: "cookie" },
          }}
        >
          <span className="gold-gradient link">Cookies</span>
        </Link>
      </div>
      <button onClick={() => handleAcceptCookie(setAccepted)}>Accept</button>
    </div>
  );
}
