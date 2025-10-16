import api from "../axios.instance";

interface SuccessConnect {
  providerId: string;
  avatarUrl: string;
  errorCode: number;
}

export const connectSocials = {
  async connectSocial(providerId: string, idToken: string) {
    try {
      const response = await api.post<SuccessConnect>(
        "/users/auth/external/link",
        { providerId, idToken }
      );

      switch (response.data.errorCode) {
        case 200:
          return { type: "success", message: "Google account connected" };
        case 400:
          return { type: "info", message: "This account is already linked" };
        case 402:
          return { type: "error", message: "Invalid Google token" };
        case 403:
          return { type: "error", message: "Google email verification failed" };
        default:
          return { type: "error", message: "Unknown error" };
      }
    } catch {
      return { type: "error", message: "Error" };
    }
  },
};
