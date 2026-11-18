
import React from "react"
import { getProductDetails } from "@/api/ProductsActions/productDetails.api"
import { GetLoggedUserWishList } from "@/api/wishlistActions/getLoggedUserWishlist"
import ProductDetails from "@/app/_components/productDetails/productDetails"
import { WishlistProductType } from "@/types/wishlist.types"

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [details, wishlist] = await Promise.all([
    getProductDetails(id),
    GetLoggedUserWishList(),
  ])

  const data = details.data

  const wishlistIds =
    wishlist?.data?.map((product: WishlistProductType) =>
      String(product._id)
    ) ?? []

  const isWishlisted = wishlistIds.includes(String(data._id))

  return <ProductDetails data={data} isWishlisted={isWishlisted} />
}
