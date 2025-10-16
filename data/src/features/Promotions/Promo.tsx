import Slider from "../Slider/Slider";
import React from "react";

import rec6 from "@/assets/imgs/rectangle.png";

const cardSlides = [
  { index: 0, title: "Slots", image: rec6.src, href: "/slots" },
  { index: 1, title: "Live Games", image: rec6.src, href: "/live" },
  { index: 2, title: "Provider", image: rec6.src, href: "/providers" },
  { index: 3, title: "Affilate", image: rec6.src, href: "/affilate" },
  { index: 4, title: "VIP", image: rec6.src, href: "/vip" },
];

export default function Promo() {
  return (
    <Slider slides={cardSlides} />
  );
}
