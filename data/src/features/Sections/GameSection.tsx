"use client";

import React from "react";

import Link from "next/link";

import ProvidersCarousel from "@/features/ProvidersCarousel/ProvidersCarousel";
import { ProvidersData } from "@/features/ProvidersCarousel/ProvidersData";

import styles from "./styles.module.css";

const Section = ({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) => (
  <div className={styles.section__games}>
    <Link href={href}>
      <span className="gold-gradient">{title}</span>
    </Link>
    {children}
  </div>
);

const GamesSection = ({
  sections,
  providers,
  showProviders = true,
}: {
  sections: {
    title: string;
    href: string;
    Component: React.FC;
  }[];
  providers?: typeof ProvidersData;
  showProviders?: boolean;
}) => (
  <div className={styles.section__wrapper}>
    {sections.map(({ title, href, Component }) => (
      <Section key={title} title={title} href={href}>
        <Component />
      </Section>
    ))}

    {showProviders && providers && (
      <Section title="Providers" href="/providers">
        <ProvidersCarousel providers={providers} id="providers" />
      </Section>
    )}
  </div>
);

export default GamesSection;
