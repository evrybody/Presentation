import api from "../axios.instance";

export const addToFavorites = async (gameId: string) => {
  try {
    const response = await api.post("/games/games/favorites/add", {
      gameId: gameId,
    });

    if (response.data.errorCode === 200) {
      return true;
    } else if (response.data.errorCode === 401) {
      return true;
    } else if (response.data.errorCode === 400) {
      return false; //to do send message limit reached
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const removeFromFavorites = async (gameId: string) => {
  try {
    const response = await api.post("/games/games/favorites/remove", {
      gameId: gameId,
    });

    if (response.data.errorCode === 200 || response.data.errorCode) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const getFavorite = async () => {
  try {
    const response = await api.get("/games/games/favorites");

    return response.data;
  } catch {
    return [];
  }
};
