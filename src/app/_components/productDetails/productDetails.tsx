
"use client";

import React, { useState } from "react";
import ProductReviews from "../ProductReviews/ProductReviews";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, FreeMode } from "swiper/modules";
import {
  Star,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
} from "lucide-react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/free-mode";
import { ProductType } from "@/types/allProducts.types";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import WishlistBtn from "../WishlistBtn/WishlistBtn";

export default function ProductDetails({
  data,
  isWishlisted,
}: {
  data: ProductType;
  isWishlisted: boolean;
}) {
  const images = data.images?.length ? data.images : [data.imageCover];
  const multiple = images.length > 1;

  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="w-[92%] max-w-6xl mx-auto py-6 lg:py-0 lg:min-h-[calc(100vh-5rem)] flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-3 min-w-0">
            <div className="group relative h-[340px] sm:h-[420px] lg:h-[calc(100vh-18rem)] lg:min-h-[320px] rounded-3xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm overflow-hidden">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={450}
                loop={multiple}
                allowTouchMove={multiple}
                autoplay={
                  multiple
                    ? {
                        delay: 3500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                      }
                    : false
                }
                onSwiper={(swiper: SwiperType) => setMainSwiper(swiper)}
                onSlideChange={(swiper: SwiperType) =>
                  setActiveIndex(swiper.realIndex)
                }
                className="h-full w-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-full w-full flex items-center justify-center p-6 lg:p-8">
                      <img
                        src={image}
                        alt={`${data.title} ${index + 1}`}
                        draggable={false}
                        className="max-w-full max-h-full object-contain select-none"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <div className="absolute top-4 right-4 z-10">
                <WishlistBtn
                  id={data._id}
                  isWishlisted={isWishlisted}
                />
              </div>

              {multiple && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={() => mainSwiper?.slidePrev()}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={() => mainSwiper?.slideNext()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 active:scale-95 transition-all duration-200"
                  >
                    <ChevronRight size={20} />
                  </button>

                  <span className="absolute bottom-4 left-4 z-10 text-xs font-medium text-gray-600 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                    {activeIndex + 1} / {images.length}
                  </span>
                </>
              )}
            </div>

            {multiple && (
              <Swiper
                modules={[FreeMode]}
                freeMode
                spaceBetween={10}
                slidesPerView="auto"
                className="!py-1 !px-1"
              >
                {images.map((image, index) => {
                  const active = activeIndex === index;

                  return (
                    <SwiperSlide key={index} className="!w-16 lg:!w-[68px]">
                      <button
                        type="button"
                        onClick={() => mainSwiper?.slideToLoop(index)}
                        aria-label={`Show image ${index + 1}`}
                        className={`block w-full aspect-square rounded-xl overflow-hidden bg-white border transition-all duration-300 ${
                          active
                            ? "border-green-500 ring-2 ring-green-500/30 shadow-md -translate-y-0.5"
                            : "border-gray-200 opacity-60 hover:opacity-100 hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${data.title} ${index + 1}`}
                          loading="lazy"
                          draggable={false}
                          className="w-full h-full object-contain p-1.5"
                        />
                      </button>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>

          <div className="space-y-4 lg:space-y-5 min-w-0">
            <p className="inline-block text-xs font-semibold text-green-700 bg-green-50 uppercase tracking-wider px-3 py-1 rounded-full">
              {data.category?.name}
            </p>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {data.title}
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg">
                <Star size={18} fill="#FFC908" color="#FFC908" />
                <span className="font-semibold text-gray-800">
                  {data.ratingsAverage}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                {data.ratingsQuantity} Reviews
              </span>
            </div>

            <p className="text-gray-600 leading-7 text-sm md:text-base lg:line-clamp-4">
              {data.description}
            </p>

            <div className="border-y border-gray-100 py-4">
              <span className="text-3xl font-bold text-green-600">
                {data.price} EGP
              </span>
            </div>

            <AddToCartButton id={data.id} isDetail={true} />

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-gray-100 p-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </span>

                <div>
                  <p className="text-xs text-gray-500">Availability</p>
                  <p className="text-sm font-semibold text-green-600">
                    In Stock
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <Truck size={20} />
                </span>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {data.category?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReviews
          productId={data._id}
      />
    </>
  );
}
