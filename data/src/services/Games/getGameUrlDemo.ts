import axios from "axios";

export const getGameUrlDemo = async (
  gameId: string /*returnUrl, device, localeCode*/
) => {
  try {
    const response = await axios.post("/games/launch/demo", {
      gameId: gameId,
      returnUrl: "https://fegfgrrrt.cfd/", //to do change to the actual return URL
      device: "descktop", // to do or "mobile" based on your requirement
      localeCode: "en", // to do change to the actual locale code
    });

    if (response.status === 200) {
      return response.data;
    } else if (response.data.errorCode === 400) {
      window.location.href = "https://fegfgrrrt.cfd/";
      return false;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};
