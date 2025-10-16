

import React from "react";
import PaymentMethod from "./PaymentMethod";
import styles from "./payments.module.css";

const Deposit: React.FC = () => {
  return (
    <div className={styles.deposit}>
      <PaymentMethod />
    </div>
  );
};

export default Deposit;
