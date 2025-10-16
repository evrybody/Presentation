import { create } from "zustand";

export enum PaymentTab {
  Deposit = "deposit",
  Withdrawal = "withdrawal",
  History = "history",
}

interface PaymentStore {
  activeTab: PaymentTab;
  setActiveTab: (tab: PaymentTab) => void;
}

export const usePaymentStore = create<PaymentStore>((set) => ({
  activeTab: PaymentTab.Deposit,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));