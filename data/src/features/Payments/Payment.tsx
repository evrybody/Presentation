import React from "react";
import { usePaymentStore, PaymentTab } from "@/store/Payments/paymentsStore";
import PaymentButton from "./PaymentsButton";
import Deposit from "./Deposit";
import Withdrawal from "./Withdrawal";
import History from "./History";
import ModalButton from "../Modal/ModalButton";
import styles from "./payments.module.css";

const Payments: React.FC = () => {
    const { activeTab } = usePaymentStore();

    const renderContent = () => {
        switch (activeTab) {
            case PaymentTab.Deposit:
                return <Deposit />;
            case PaymentTab.Withdrawal:
                return <Withdrawal />;
            case PaymentTab.History:
                return <History />;
            default:
                return null;
        }
    };

    return (
        <ModalButton buttonText="Deposit" buttonClass="paymentModal">
            <div className={styles.paymentWindow}>
                <div className={styles.tabButtons}>
                    <PaymentButton tab={PaymentTab.Deposit} label="Deposit" />
                    <PaymentButton tab={PaymentTab.Withdrawal} label="Withdrawal" />
                    <PaymentButton tab={PaymentTab.History} label="History" />
                </div>
                {renderContent()}
            </div>
        </ModalButton>
    );
};

export default Payments;