import axios from "axios";
import api from "../axios.instance";

export interface CountryBlockStatusResponse {
  errorCode: number;
  message?: string;
  data?: {
    isBlocked?: boolean;
    country?: string;
    ip?: string;
  };
}

export interface CountryBlockStatusResult {
  type: "success" | "error";
  message: string;
  code: number;
  isBlocked?: boolean;
  country?: string;
  ip?: string;
}

const ERROR_MESSAGES: Record<number, string> = {
  200: "OK",
  400: "Unknown IP address",
  401: "Exception in country request",
  402: "Country is blocked",
};

export const getCountryBlockStatus = async (
  ip?: string
): Promise<CountryBlockStatusResult> => {
  try {
    const response = await axios.get<CountryBlockStatusResponse>(
      "/users/info/country/block/status",
      { params: ip ? { ip } : undefined }
    );

    const { errorCode, message: backendMessage, data } = response.data;
    const message =
      ERROR_MESSAGES[errorCode] || backendMessage || "Unknown error";

    return {
      type: errorCode === 200 ? "success" : "error",
      message,
      code: errorCode,
      isBlocked: data?.isBlocked ?? errorCode === 402,
      country: data?.country,
      ip: data?.ip,
    };
  } catch (error) {
    return {
      type: "error",
      message: axios.isAxiosError(error)
        ? error.message || "Failed to get country block status"
        : "Network error occurred",
      code: 500,
    };
  }
};

export const getVerificationStatus = async (): Promise<boolean> => {
  try {
    const response = await api.get<{ data: boolean }>(
      "/users/user/verification/status"
    );
    return response.data.data;
  } catch {
    return false;
  }
};
