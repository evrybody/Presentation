import styles from "./payments.module.css";
import React from "react";

const Withdrawal: React.FC = () => {
  return (
    <div className={styles.withdrawal}>
      <h2>Withdrawal</h2>
      <label>Оператор</label>
      <input type="text" />
      <label>Сумма пополнения</label>
      <input type="number" />
      <button>Перейти к оплате</button>
    </div>
  );
};

export default Withdrawal;
