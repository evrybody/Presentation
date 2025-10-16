// import axios from "axios";
import Cookies from "js-cookie";
import { authService } from "@/services/auth.service";
import { AlertProps } from "@/features/Alert/Alert";
import api from "@/services/axios.instance";

interface CryptoPay {
  amount: number;
  currency: string;
  successUrl: string;
  cancelUrl: string;
}

interface CryptoPayResponse {
  type: AlertProps["type"];
  message: string;
  paymentLink?: string;
}

export const cryptoService = {
  async createCryptoPay({
    amount,
    currency,
    successUrl,
    cancelUrl,
    setAlert,
  }: CryptoPay & {
    setAlert: (alert: AlertProps | null) => void;
  }): Promise<CryptoPayResponse> {
    const accountId = Cookies.get("userId");

    try {
      let accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        try {
          await authService.refreshToken();

          console.log("Token refreshed successfully");

          accessToken = Cookies.get("accessToken");

          return await this.createCryptoPay({
            amount,
            currency,
            successUrl,
            cancelUrl,
            setAlert,
          });
        } catch {
          await authService.logout();

          const alertProps: AlertProps = {
            type: "error",
            message: "Session expired. Please log in again.",
          };
          setAlert(alertProps);

          return alertProps;
        }
      }

      const response = await api.post("/payments/nowp/create", {
        accountId,
        currency,
        amount,
        successUrl,
        cancelUrl,
      });

      const { errorCode, data } = response.data;

      if (errorCode === 200) {
        const alertProps: AlertProps = {
          type: "success",
          message: "Payment link successfully created!",
        };
        setAlert(alertProps);

        return {
          ...alertProps,
          paymentLink: data,
        };
      } else if (errorCode === 401) {
        const alertProps: AlertProps = {
          type: "warning",
          message: "Amount less than the min amount",
        };
        setAlert(alertProps);

        return alertProps;
      } else {
        const alertProps: AlertProps = {
          type: "error",
          message: "The payment link could not be generated.",
        };
        setAlert(alertProps);

        return alertProps;
      }
    } catch (error: unknown) {
      const alertProps: AlertProps = {
        type: "error",
        message: `Server error: ${(error as Error).message || error}`,
      };
      setAlert(alertProps);

      return alertProps;
    }
  },
};
