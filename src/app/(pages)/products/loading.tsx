import React from "react";

export default function Loading() {
  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8">
          <div className="h-8 w-40 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-64 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="aspect-square animate-pulse bg-gray-200" />

              <div className="space-y-3 p-4">
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />

                <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="flex items-center justify-between pt-2">
                  <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
                </div>

                <div className="h-10 w-full animate-pulse rounded-xl bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

