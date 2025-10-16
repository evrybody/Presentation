interface Provider {
  id: number;
  name: string;
  image?: string;
}

import pragmaticPlay from "@/assets/imgs/pragmaticPlay.png";
import endorphina from "@/assets/imgs/endorphina.png"; //to do load images of providers on CDN server

export const ProvidersData: Provider[] = [
  {
    id: 1,
    name: "Pragmatic Play",
    image: pragmaticPlay.src,
  },
  {
    id: 2,
    name: "Endorphina",
    image: endorphina.src,
  },
  {
    id: 3,
    name: "Amusnet",
  },
  {
    id: 4,
    name: "Nolimit City",
  },
  {
    id: 5,
    name: "HacksawGaming",
  },
  {
    id: 6,
    name: "Amatic",
  },
  {
    id: 7,
    name: "Play'n GO",
  },
  {
    id: 8,
    name: "3 Oaks Gaming",
  },
  {
    id: 9,
    name: "Relax Gaming",
  },
  {
    id: 10,
    name: "Spinomenal",
  },
  {
    id: 11,
    name: "Belatra",
  },
  {
    id: 12,
    name: "Playson",
  },
  {
    id: 13,
    name: "BGaming",
  },
  {
    id: 14,
    name: "NetGame",
  },
  {
    id: 15,
    name: "Quickspin",
  },
  {
    id: 16,
    name: "Gamzix",
  },
  {
    id: 17,
    name: "Novomatic",
  },
  {
    id: 18,
    name: "Wazdan",
  },
  {
    id: 19,
    name: "Yggdrasil",
  },
  {
    id: 20,
    name: "Microgaming",
  },
  {
    id: 21,
    name: "NetEnt",
  },
  {
    id: 22,
    name: "iSoftBet",
  },
  {
    id: 23,
    name: "Evolution Gaming",
  },
  {
    id: 24,
    name: "Red Tiger",
  },
  {
    id: 25,
    name: "Big Time Gaming",
  },
  {
    id: 26,
    name: "Push Gaming",
  },
  {
    id: 27,
    name: "Thunderkick",
  },
  {
    id: 28,
    name: "ELK Studios",
  },
  {
    id: 29,
    name: "Blueprint Gaming",
  },
  {
    id: 30,
    name: "Iron Dog Studio",
  },
  {
    id: 31,
    name: "Blueprint",
  },
];
