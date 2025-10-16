"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import dynamic from "next/dynamic";
const Link = dynamic(() => import("next/link"));

import "./Slider.css";

interface SlideData {
  index: number;
  title: string;
  image: string;
  href: string;
}

interface SliderProps {
  slides: SlideData[];
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  return (
    <Swiper
      className="slider-swiper"
      grabCursor={true}
      centeredSlides={false}
      slidesPerView={2}
      spaceBetween={20}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      }}
      modules={[Autoplay]}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.index}>
          <div
            className="slide-content"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <Link href={slide.href} className="slide-link">
              <h3>{slide.title}</h3>
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
