"use client";

import React from "react";
import { usePaymentStore, PaymentTab } from "@/store/Payments/paymentsStore";
import PaymentButton from "@/features/Payments/PaymentsButton";
import Deposit from "@/features/Payments/Deposit";
import Withdrawal from "@/features/Payments/Withdrawal";
import History from "@/features/Payments/History";
import { useSidebar } from "@/features/Sidebar/SidebarContext";
import "./page.css";

const Payments: React.FC = () => {
    const { activeTab } = usePaymentStore();
    const { isOpen } = useSidebar();

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
        <div className={`payment__wrapper ${isOpen ? "payment__wrapper--unshifted" : ""}`}>
            <div className="paymentWindow">
                <div className="tabButtons">
                    <PaymentButton tab={PaymentTab.Deposit} label="Deposit" />
                    <PaymentButton tab={PaymentTab.Withdrawal} label="Withdrawal" />
                    <PaymentButton tab={PaymentTab.History} label="History" />
                </div>
                {renderContent()}
            </div>
        </div >
    );
};

export default Payments;
