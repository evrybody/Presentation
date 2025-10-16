import React, { useState } from "react";

import useAuthStore from "@/store/Auth/authStore";

import LoginFormModal from "@/features/Auth/Login/LoginForm";
import RegistrationFormModal from "@/features/Auth/Registration/Registration";

import { Wallet, HelpCircle } from "lucide-react";

import { advantages } from "../affilate.config";

import type { OverviewProps } from "../affilate.config";

import styles from "../styles.module.css";

export default function Overview({ setActiveTab }: OverviewProps) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <section className={styles.overviewWrapper}>
      <header className={styles.overviewHeader}>Overview</header>
      {!isAuthenticated ? <AuthPromo /> : <AffiliateLink />}

      <span>Exclusive Advantages</span>
      <AdvantagesList />

      <section className={styles.infoSection}>
        <span>Track your earnings below: </span>
        {isAuthenticated && <CommissionButton setActiveTab={setActiveTab} />}
      </section>

      <section className={styles.infoSection}>
        <span>Need help?</span>
        {isAuthenticated && <FAQButton setActiveTab={setActiveTab} />}
      </section>
    </section>
  );
}
function AuthPromo() {
  return (
    <section className={styles.infoSection}>
      <span>
        Sign up for the Gamble Affiliate Program today!
      </span>
      <LoginFormModal />
      <RegistrationFormModal />
    </section>
  );
}

function AffiliateLink() {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText("your-affiliate-link"); //to do create affilate link
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={styles.infoSection}>
      Share your link and earn!
      <div className="campaignLink">Affilate link</div>
      <button onClick={copyToClipboard}>{copied ? "Copied!" : "Link"}</button>
    </section>
  );
}

function AdvantagesList() {
  return (
    <div className={styles.advantagesGrid}>
      {advantages.map(({ icon: Icon, title, desc }, i) => (
        <div key={i} className={styles.advantageItem}>
          <div className={styles.advIcon}>
            <Icon size={24} />
          </div>
          <div className={styles.advText}>
            <span>{title}</span>
            <p>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
function CommissionButton({ setActiveTab }: OverviewProps) {
  return (
    <button
      className={styles.tabButton}
      onClick={() => setActiveTab?.("commissions")}
      style={{ width: "fit-content" }}
    >
      <Wallet size={18} /> Commissions
    </button>
  );
}

function FAQButton({ setActiveTab }: OverviewProps) {
  return (
    <button
      className={styles.tabButton}
      onClick={() => setActiveTab?.("faq")}
      style={{ width: "fit-content" }}
    >
      <HelpCircle size={18} /> FAQ
    </button>
  );
}
