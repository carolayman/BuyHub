
"use client";

import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { CategoryType } from "@/types/categories.types";

export default function SubSlider({ data }: { data: CategoryType[] }) {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={16}
      slidesPerView={2}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        480: { slidesPerView: 3 },
        640: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
        1280: { slidesPerView: 7 },
      }}
    >
      {data.map((category) => (
        <SwiperSlide key={category._id}>
          <Link
            href={`/categories/${category._id}`}
            className="group block cursor-pointer"
          >
            <div className="overflow-hidden rounded-2xl bg-gray-50 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md">
              <div className="aspect-square">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <h3 className="mt-3 truncate text-center text-sm font-semibold text-gray-800 transition-colors duration-200 group-hover:text-green-500">
              {category.name}
            </h3>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
