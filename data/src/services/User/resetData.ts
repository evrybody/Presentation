import api from "../axios.instance";
import axios, { AxiosResponse } from "axios";

import useAuthStore from "@/store/Auth/authStore";

interface VerificationResponse {
  type: "success" | "error";
  message: string;
}

const handleApiResponse = (
  response: AxiosResponse,
  successMessage: string
): VerificationResponse => {
  if (response.data.errorCode && response.data.errorCode !== 200) {
    return {
      type: "error",
      message: response.data.message || "Error",
    };
  }
  return {
    type: "success",
    message: successMessage,
  };
};

export const resetName = async (
  name: string
): Promise<VerificationResponse> => {
  try {
    const response = await api.post("/users/reset/name", { name });
    const result = handleApiResponse(response, "Name changed successfully");

    if (result.type === "success") {
      const store = useAuthStore.getState();
      if (store.user) {
        useAuthStore.setState({
          user: { ...store.user, name },
        });
      }
    }

    return result;
  } catch {
    return {
      type: "error",
      message: "Request failed",
    };
  }
};

export const resetPassword = async (
  newPassword: string,
  oldPassword: string
): Promise<VerificationResponse> => {
  try {
    const response = await api.post("/users/reset/password", {
      oldPassword,
      newPassword,
    });
    return handleApiResponse(response, "Password changed successfully");
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      const errorCode =
        (error.response.data as { errorCode?: number })?.errorCode ??
        error.response.status;
      switch (errorCode) {
        case 401:
          return { type: "error", message: "New password is the same as old" };
        case 402:
          return { type: "error", message: "Incorrect old password" };
      }
    }

    return {
      type: "error",
      message: "Request failed",
    };
  }
};
