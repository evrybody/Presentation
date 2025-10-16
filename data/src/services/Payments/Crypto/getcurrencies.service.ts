import api from "@/services/axios.instance";

export const getCryptoCurrencies = async () => {
  try {
    const response = await api.get("/payments/nowp/currencies");

    if (response.data.errorCode === 200) {
      return response.data.data || [];
    }

    if (response.data.errorCode === 400) {
      return ["not available"];
    }
  } catch {
    return ["Empty"];
  }
};
