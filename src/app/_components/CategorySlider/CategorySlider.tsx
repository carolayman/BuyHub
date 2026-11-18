import React from "react";
import SubSlider from "../subSlider/subSlider";
import { getAllCategories } from "@/api/categoriesActions/getAllCategories.action";

export default async function CategorySlider() {
  const data = await getAllCategories();

  return (
    <section className="w-full bg-white py-10 md:py-12">
      <div className="mx-auto w-[90%] max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-13 w-1.5 rounded-full bg-green-500" />

            <div>
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider text-green-500">
                Explore
              </p>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                Shop Popular Categories
              </h2>
            </div>
          </div>
        </div>

        <SubSlider data={data.data} />
      </div>
    </section>
  );
}