import React from "react";
import { usePaymentStore, PaymentTab } from "@/store/Payments/paymentsStore";
import styles from "./payments.module.css";

interface PaymentButtonProps {
  tab: PaymentTab;
  label: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ tab, label }) => {
  const { activeTab, setActiveTab } = usePaymentStore();

  return (
    <button
      className={`${styles.paymentButton} ${
        activeTab === tab ? styles.active : ""
      }`}
      onClick={() => setActiveTab(tab)}
    >
      {label}
    </button>
  );
};

export default PaymentButton;
