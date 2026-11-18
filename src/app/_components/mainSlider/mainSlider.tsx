
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import mainSlider1 from "../../../../public/mainSlider1.jpg";
import mainSlider2 from "../../../../public/mainSlider2.jpg";
import mainSlider3 from "../../../../public/mainSlider3.jpg";
import mainSlider4 from "../../../../public/mainSlider4.jpg";

import "swiper/css";
import "swiper/css/pagination";

export default function MainSlider() {
  const slides = [
    {
      image: mainSlider1,
      title: "Discover Your Style",
      description: "Shop the latest fashion trends for everyone.",
      button: "Shop Fashion",
    },
    {
      image: mainSlider2,
      title: "Upgrade Your Everyday",
      description: "Discover the latest technology and smart devices.",
      button: "Shop Electronics",
    },
    {
      image: mainSlider3,
      title: "Everything You Need",
      description: "Fresh products and everyday essentials in one place.",
      button: "Shop Now",
    },
    {
      image: mainSlider4,
      title: "Shop Everything You Love",
      description: "One place. Thousands of choices.",
      button: "Explore Products",
    },
  ];

  return (
    <section className="w-full bg-green-50">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        className="[&_.swiper-pagination]:!bottom-5 [&_.swiper-pagination-bullet]:!mx-1 [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!rounded-full [&_.swiper-pagination-bullet]:!bg-white/70 [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet]:!transition-all [&_.swiper-pagination-bullet]:!duration-300 [&_.swiper-pagination-bullet-active]:!w-8 [&_.swiper-pagination-bullet-active]:!bg-green-500"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[400px] w-full overflow-hidden md:h-[500px]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-green-950/80 via-green-900/50 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-green-950/40 to-transparent" />

              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-[90%] max-w-7xl px-2 sm:px-5 lg:px-8">
                  <div className="max-w-xl">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-300/40 bg-green-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-green-100 backdrop-blur-md md:text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                      BuyHub
                    </span>

                    <h1 className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-lg sm:text-5xl md:text-6xl">
                      {slide.title}
                    </h1>

                    <p className="mb-8 max-w-md text-base leading-7 text-green-50/90 md:text-lg">
                      {slide.description}
                    </p>

                    <Link
                      href="/products"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/40 ring-1 ring-green-300/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-green-400 hover:to-emerald-500 hover:shadow-xl hover:shadow-green-900/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-green-300/50 md:px-8 md:py-4 md:text-base"
                    >
                      {slide.button}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 md:h-5 md:w-5"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
