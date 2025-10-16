import axios from "axios";
import { authService } from "./auth.service";
import { tokenService } from "./token.service";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = tokenService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await authService.refreshToken();

        if (newAccessToken) {
          tokenService.setTokens(newAccessToken);
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };
        }

        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed:", refreshError);
        await authService.logout();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
