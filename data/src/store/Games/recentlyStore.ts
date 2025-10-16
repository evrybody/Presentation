import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { GameItem } from "@/types/gameItem";

export interface RecentlyPlayedGame extends GameItem {
  playedAt: number;
}

interface RecentlyStore {
  games: RecentlyPlayedGame[];
  addGame: (game: GameItem) => void;
  clearGames: () => void;
}

export const useRecentlyStore = create<RecentlyStore>()(
  persist(
    (set, get) => ({
      games: [],

      addGame: (game) => {
        const currentGames = get().games;

        const filtered = currentGames.filter((g) => g.id !== game.id);

        const updated = [{ ...game, playedAt: Date.now() }, ...filtered];

        set({ games: updated.slice(0, 5) });
      },

      clearGames: () => set({ games: [] }),
    }),
    {
      name: "recently-played-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
