import React from "react"
import { getAllProducts } from "@/api/ProductsActions/GetAllProducts.api"
import SingleProduct from "../../_components/singleProduct/singleProduct"
import { ProductType } from "@/types/allProducts.types"
import { GetLoggedUserWishList } from "@/api/wishlistActions/getLoggedUserWishlist"
import { WishlistProductType } from "@/types/wishlist.types"

export default async function AllProducts() {
  const data = await getAllProducts()
  const wishlist = await GetLoggedUserWishList()

  const wishlistIds =
    wishlist?.data?.map((product: WishlistProductType) =>
      String(product._id)
    ) ?? []

  return (
    <div className="min-h-screen rounded-2xl bg-gray-50">
      <div className="mx-auto w-[94%] max-w-7xl py-6 sm:w-[92%] sm:py-10">
        <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.data.map((currentProduct: ProductType) => (
            <SingleProduct
              key={currentProduct._id}
              currentProduct={currentProduct}
              isWishlisted={wishlistIds.includes(String(currentProduct._id))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}