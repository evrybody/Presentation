import axios from "axios";
import api from "./axios.instance";
import { User } from "@/types/user";
import { Auth } from "@/types/auth";
import { tokenService } from "./token.service";
import { IRegistrationArguments } from "@/types/handlers/IRegistrationArguments";

import Router from "next/router";

export interface AuthResponse {
  user: User;
  auth: Auth;
  accessToken: string;
  refreshToken: string;
  errorCode: number;
}

export interface AuthResult {
  type: "success" | "error" | "warning";
  message: string;
  // code?: number;
  user?: User;
}

const ERROR_MESSAGES: Record<number | string, string> = {
  "400": "Invalid request data",
  "401": "IP address not available",
  "402": "Country code not available",
  "user already exists": "User already exists",
  "user not exists": "User not found",
  "incorrect password": "Incorrect password",
};

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export const authService = {
  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const response = await axios.post<AuthResponse>("/users/auth/login", {
        email,
        password,
      });

      if (response.data.errorCode !== 200) {
        const errorMessage =
          ERROR_MESSAGES[response.data.errorCode] || "Login failed";

        return {
          type: "error",
          message: errorMessage,
        };
      }
      const { user, auth, accessToken, refreshToken } = response.data;

      const mergedUser: User = {
        ...user,
        email: auth.email,
        isEmailConfirmed: auth.isEmailConfirmed,
      };

      document.cookie = `userId=${mergedUser.id}; Path=/; Secure; SameSite=Strict`; //to do rework (antipattern)

      tokenService.setTokens(accessToken, refreshToken);

      return { type: "success", message: "Successful", user: mergedUser };
    } catch (error) {
      return this.handleError(error, "Login failed");
    }
  },

  async registration(data: IRegistrationArguments): Promise<AuthResult> {
    try {
      const response = await axios.post<AuthResponse>(
        "/users/auth/register",
        data
      );

      if (response.data.errorCode !== 200) {
        const errorMessage =
          ERROR_MESSAGES[response.data.errorCode] || "Registration failed";

        return {
          type: "error",
          message: errorMessage,
        };
      }
      const { user, accessToken, refreshToken } = response.data;
      tokenService.setTokens(accessToken, refreshToken);

      return {
        type: "success",
        message: "Registration successful",
        user,
      };
    } catch (error) {
      return this.handleError(error, "Registration failed");
    }
  },

  async getBalance(): Promise<number> {
    try {
      const response = await api.get("/payments/users/balance");
      return response.data;
    } catch (error) {
      throw this.handleError(error, "Failed to update balance");
    }
  },

  async refreshToken(): Promise<string> {
    if (isRefreshing) return refreshPromise!;

    isRefreshing = true;
    refreshPromise = new Promise(async (resolve, reject) => {
      try {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) {
          await this.logout();
          return reject("No refresh token");
        }

        const response = await axios.post(
          "/users/auth/update/access",
          {
            refreshToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newAccessToken = response.data.data;

        if (newAccessToken && refreshToken) {
          tokenService.setTokens(newAccessToken, refreshToken);
        }

        resolve(newAccessToken);
      } catch (error) {
        this.clearSession();
        reject(error);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    });

    return refreshPromise!;
  },

  async logout(): Promise<AuthResult> {
    try {
      await api.post("/users/auth/logout").catch(() => {});

      this.clearSession();
      Router.push("/");
      return { type: "success", message: "Logged out successfully" };
    } catch (error) {
      this.clearSession();
      return this.handleError(error, "Logout failed");
    }
  },

  clearSession() {
    tokenService.clearTokens();
    localStorage.removeItem("auth-storage");

    delete axios.defaults.headers.common["Authorization"];
    delete api.defaults.headers.common["Authorization"];
  },

  handleError(error: unknown, defaultMessage: string): AuthResult {
    if (axios.isAxiosError(error)) {
      const errorCode = error.response?.data?.errorCode;
      const message = errorCode
        ? ERROR_MESSAGES[errorCode] || error.response?.data?.message
        : defaultMessage;

      return {
        type: "error",
        message: message || defaultMessage,
      };
    }
    return { type: "error", message: defaultMessage };
  },
};
