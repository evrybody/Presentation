import axios from "axios";
import api from "./axios.instance";

import { User } from "@/types/user";
import { AuthResponse } from "./auth.service";
import { tokenService } from "./token.service";

import { useAuthStore } from "@/store/Auth/authStore";

export const externalAuthService = {
  async googleLogin(idToken: string) {
    try {
      const response = await axios.post<AuthResponse>(
        "/users/auth/external/login",
        { providerId: "google", idToken }
      );

      if (response.data.errorCode == 400) {
        return {
          type: "warning",
          message: "Email in use. Sign in with email and enable Google login.",
        };
      }

      if (response.data.errorCode == 401) {
        return {
          type: "error",
          message: "Account is blocked",
        };
      }

      if (response.data.errorCode !== 200) {
        return {
          type: "error",
          message: "Google auth failed",
        };
      }

      const { user, auth, accessToken, refreshToken } = response.data;

      if (!user.currencyCode || !user.dateOfBirth)
        return {
          type: "incomplited",
        };

      const mergedUser: User = {
        ...user,
        email: auth.email,
        isEmailConfirmed: auth.isEmailConfirmed,
      };

      document.cookie = `userId=${mergedUser.id}; Path=/; Secure; SameSite=Strict`; //to do rework (antipattern)
      tokenService.setTokens(accessToken, refreshToken);
      useAuthStore.getState().login(mergedUser);

      return { type: "success", message: "Successful" };
    } catch {
      return { type: "error", message: "Error" };
    }
  },

  async googleRegister(idToken: string) {
    try {
      const response = await axios.post<AuthResponse>(
        "/users/auth/external/register",
        { providerId: "google", idToken }
      );

      if (response.data.errorCode == 200) {
        return {
          type: "incomplited",
        };
      } else if (response.data.errorCode == 400) {
        return await this.googleLogin(idToken);
      } else {
        return {
          type: "error",
          message: "Google auth failed",
        };
      }
    } catch {
      return {
        type: "error",
        message: "Google registration failed",
      };
    }
  },

  async completeGoogleRegistration({
    dateOfBirth,
    currencyCode,
    idToken,
  }: {
    dateOfBirth: string;
    currencyCode: string;
    idToken: string;
  }) {
    try {
      await api.post("/users/reset/dateOfBirth", { dateOfBirth });
      await api.post("/users/reset/currency", { currencyCode });
    } catch {
      return { type: "error", message: "Saving profile data failed" };
    }
    return await this.googleLogin(idToken);
  },
};
