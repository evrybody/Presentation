import React from "react";

import styles from "../styles.module.css";

export default function Campaigns() {
  return (
    <section className={styles.overviewWrapper}>
      <header className={styles.overviewHeader}>Campaigns</header>

      <span>Exclusive Advantages</span>

      <section className={styles.infoSection}>
        <span>Track your earnings below: </span>
      </section>

      <section className={styles.infoSection}>
        <span>Need help?</span>
      </section>
    </section>
  );
}
