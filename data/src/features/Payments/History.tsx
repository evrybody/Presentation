import styles from "./payments.module.css";

import React from "react";

const History: React.FC = () => {
  return (
    <div className={styles.history}>
      <h2>History</h2>
      <p>История операций</p>
    </div>
  );
};

export default History;
