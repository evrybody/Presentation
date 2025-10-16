import api from "../axios.instance";
import { AxiosError } from "axios";

interface VerificationResponse {
  type: "success" | "error";
  message: string;
}

export const sendVerificationCode = async (): Promise<VerificationResponse> => {
  const response = await api.post("/users/email/confirmation/send");

  if (response.data.errorCode && response.data.errorCode !== 200) {
    return {
      type: "error",
      message: response.data.message || "Verification failed",
    };
  }

  return {
    type: "success",
    message: "Verification code sent to your email",
  };
};

export const writeVerificationCode = async (
  writtedCode: number
): Promise<VerificationResponse> => {
  try {
    const response = await api.post("/users/email/confirmation/write", {
      code: writtedCode,
    });

    if (response.data.errorCode && response.data.errorCode !== 200) {
      if (response.data.errorCode === 400) {
        return { type: "error", message: "Code is expired" };
      }
      if (response.data.errorCode === 401) {
        return { type: "error", message: "Invalid code" };
      }

      return {
        type: "error",
        message: response.data.message,
      };
    }

    return { type: "success", message: "Email verified successfully" };
  } catch (error: unknown) {
    const err = error as AxiosError;
    return { type: "error", message: err.message || "Verification failed" };
  }
};
