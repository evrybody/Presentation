import api from "@/services/axios.instance";

export const getPaymentSystemStatus = async () => {
  try {
    const response = await api.get("/payments/nowp/status");

    if (response.data.errorCode === 200) {
      return true;
    }
  } catch {
    return false;
  }
};
