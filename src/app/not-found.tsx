"use client";

import Link from "next/link";
import {
  Apple,
  Carrot,
  Citrus,
  Sprout,
  ShoppingCart,
  Home,
  ArrowLeft,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-[#fafbfc] px-4 py-16">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Apple className="absolute left-[5%] top-[10%] h-10 w-10 animate-[float_6s_ease-in-out_infinite] text-green-200" />

        <Carrot className="absolute right-[10%] top-[20%] h-9 w-9 animate-[float_8s_ease-in-out_infinite_1s] text-green-200" />

        <Citrus className="absolute bottom-[25%] left-[8%] h-9 w-9 animate-[float_7s_ease-in-out_infinite_0.5s] text-green-200" />

        <Sprout className="absolute bottom-[15%] right-[15%] h-10 w-10 animate-[float_9s_ease-in-out_infinite_2s] text-green-200" />

        <Apple className="absolute left-[15%] top-[50%] h-7 w-7 animate-[float_5s_ease-in-out_infinite_1.5s] text-green-100" />

        <Carrot className="absolute right-[5%] top-[40%] h-7 w-7 animate-[float_6s_ease-in-out_infinite_0.8s] text-green-100" />

        {/* Blurred circles */}
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-green-100/40 to-transparent blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-green-100/30 to-transparent blur-3xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xl">
        {/* Illustration */}
        <div className="mb-10 flex justify-center">
          <div className="relative h-52 w-64 sm:h-60 sm:w-72">
            {/* Glow */}
            <div className="absolute inset-0 h-52 w-64 rounded-[32px] bg-green-100/50 blur-2xl sm:h-60 sm:w-72" />

            {/* Cart Container */}
            <div className="absolute inset-x-0 top-4 mx-auto flex h-40 w-52 items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl shadow-gray-200/60 sm:h-44 sm:w-60">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-transparent to-green-100/40" />

              <ShoppingCart className="relative h-16 w-16 text-green-400/80 sm:h-[72px] sm:w-[72px]" />
            </div>

            {/* 404 Circle */}
            <div className="absolute right-0 top-0">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-white shadow-lg" />

                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/40 sm:h-20 sm:w-20">
                  <span className="text-xl font-black tracking-tight text-white sm:text-2xl">
                    404
                  </span>
                </div>
              </div>
            </div>

            {/* Cart Face */}
            <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center justify-center gap-4">
              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />

              <div className="h-4 w-8 rounded-b-full border-b-[3px] border-green-400" />

              <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
            Oops! Nothing Here
          </h1>

          <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-500">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>
        </div>

        {/* Buttons */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/30 sm:w-auto"
          >
            <Home className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            Go to Homepage
          </Link>

          <button
            onClick={() => window.history.back()}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white px-8 py-4 text-lg font-bold text-gray-700 shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:shadow-lg sm:w-auto"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Go Back
          </button>
        </div>

        {/* Popular Destinations */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-gray-400">
            Popular Destinations
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-700 transition-colors hover:bg-green-100"
            >
              All Products
            </Link>

            <Link
              href="/categories"
              className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Categories
            </Link>

            <Link
              href="/brands"
              className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Brands
            </Link>

            <Link
              href="/cart"
              className="rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}