import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AxiosError } from "axios";
import { User } from "@/types/user";
import { tokenService } from "@/services/token.service";
import { authService } from "@/services/auth.service";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  balance: number;
  login: (user: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  fetchBalance: () => Promise<void>;
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      balance: 0,
      login: (user: User) => {
        set({ user, isAuthenticated: true });
      },
      logout: async () => {
        try {
          if (get().isAuthenticated) {
            await authService.logout();
          }
        } finally {
          tokenService.clearTokens();
          set({ user: null, isAuthenticated: false, balance: 0 });
        }
      },

      async checkAuth() {
        const accessToken = tokenService.getAccessToken();
        if (!accessToken) {
          try {
            const newToken = await authService.refreshToken();
            if (!newToken) {
              set({ user: null, isAuthenticated: false });
              return;
            }
          } catch {
            set({ user: null, isAuthenticated: false });
            return;
          }
        }
        if (get().isAuthenticated) {
          await get().fetchBalance();
        }
      },

      async fetchBalance() {
        set({ isLoading: true });
        try {
          const response = await authService.getBalance();
          set({ balance: response });
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            const status = error.response?.status;

            if (status === 400) {
              return;
            }

            if (status === 404) {
              await get().logout();
              return;
            }
          }
          set({ balance: 0, user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        balance: state.balance,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
(() => {
  const hasTokens =
    !!tokenService.getAccessToken() && !!tokenService.getRefreshToken();
  const s = useAuthStore.getState();
  if (!hasTokens && (s.isAuthenticated || s.user)) {
    useAuthStore.setState({ user: null, isAuthenticated: false, balance: 0 });
  }
})();
export default useAuthStore;
