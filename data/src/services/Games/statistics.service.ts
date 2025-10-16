import api from "../axios.instance";

import { authService } from "@/services/auth.service";

export interface Statistics {
  betsCount: number;
  betsSumAmount: number;
  winsCount: number;
  winsSumAmount: number;
}

export const getStatistics = async (): Promise<Statistics> => {
  const response = await api.get("/games/statistics/main/transactions");

  if (response.data.errorCode === 400) await authService.logout(); //to do check how its work

  return response.data;
};
