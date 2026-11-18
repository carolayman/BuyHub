
import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";
import { ProductType } from "@/types/allProducts.types";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import WishlistBtn from "../WishlistBtn/WishlistBtn";

export default function SingleProduct({ currentProduct , isWishlisted }: { currentProduct: ProductType  , isWishlisted:boolean}) {
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-green-500 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      <div className="relative bg-white">
        <Link href={`/products/${currentProduct.id}`} className="block">
          <img
            src={currentProduct.imageCover}
            alt={currentProduct.title}
            className="w-full h-64 sm:h-60 object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-1 right-1 z-10">
          <WishlistBtn id={currentProduct._id} isWishlisted={isWishlisted} />
        </div>
      </div>

      <Link href={`/products/${currentProduct.id}`} className="flex flex-col flex-grow">
        <div className="px-4 pb-2 flex-grow flex flex-col justify-between">
          <div>
            <p className="text-xs text-green-500 mb-1 truncate">
              {currentProduct.category.name}
            </p>

            <h2
              className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] mb-3 hover:text-primary transition-colors"
              title={currentProduct.title}
            >
              {currentProduct.title}
            </h2>
          </div>

          <div className="flex items-center justify-between gap-2 mt-2">
            <span className="text-lg font-bold text-gray-700">
              {currentProduct.price} EGP
            </span>

            <div className="flex items-center gap-1">
              <Star size={16} fill="#FFC908" color="#FFC908" />
              <span className="text-xs text-gray-500">
                {currentProduct.ratingsAverage}
              </span>
            </div>
          </div>
        </div>
      </Link>

      <AddToCartButton id={currentProduct.id} />
    </div>
  );
}
