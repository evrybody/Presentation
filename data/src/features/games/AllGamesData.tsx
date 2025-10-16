import { FastData } from "@/features/games/data/FastData";
import { BonusesData } from "@/features/games/data/BonusesData";
import { SlotsData } from "@/features/games/data/SlotsData";

export const getAllGames = () => {
  return [...FastData, ...BonusesData, ...SlotsData];
};

export const getGameById = (gameId: string) => {
  const allGames = getAllGames();
  return allGames.find((game) => game.id === gameId);
};
