import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const tokenService = {
  getAccessToken(): string | undefined {
    return Cookies.get(ACCESS_TOKEN_KEY);
  },

  getRefreshToken(): string | undefined {
    return Cookies.get(REFRESH_TOKEN_KEY);
  },

  setTokens(accessToken: string, refreshToken?: string) {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      secure: true,
      sameSite: "strict",
      // httpOnly: true,
    });
    if (refreshToken) {
      Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
        secure: true,
        sameSite: "strict",
        expires: 30,
      });
    }
  },

  clearTokens() {
    Cookies.remove(ACCESS_TOKEN_KEY);
    Cookies.remove(REFRESH_TOKEN_KEY);
    Cookies.remove("userId");
  },
};
