import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { Chonburi } from "next/font/google";

import { SidebarProvider } from "@/features/Sidebar/SidebarContext";

import { AuthProvider } from "@/features/Auth/AuthGate/AuthContext"; //to do: delete for prod
import AuthGate from "@/features/Auth/AuthGate/AuthGate"; //to do: delete for prod

import Header from "@/features/Header/Header";
import Sidebar from "@/features/Sidebar/Sidebar";
import Footer from "@/features/Footer/Footer";

// import BackgroundCircles from "@/features/BackgroundCircles/BackgroundCircles";
import CookieRules from "@/features/CookieRules/CookieRules";

// import "swiper/swiper-bundle.css";
// import "swiper/css";

import "@/globals.css";

const chonburi = Chonburi({
  weight: "400",
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: "Gamble casino",
  description: "Best casino",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" translate="no">
      <body className={chonburi.className}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <AuthProvider>
            <AuthGate>
              <SidebarProvider>
                {/* <BackgroundCircles /> */}
                <Header />
                <Sidebar />
                <main>{children}</main>
                <Script
                  src="https://accounts.google.com/gsi/client"
                  strategy="afterInteractive"
                />
                <CookieRules />
                <Footer />
              </SidebarProvider>
            </AuthGate>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
