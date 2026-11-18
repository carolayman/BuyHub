export interface WishlistType {
  status: string
  count: number
  data: WishlistProductType[]
}

export type WishlistProductType = {
  sold: number
  images: string[]
  subcategory: SubcategoryType[]
  ratingsQuantity: number
  _id: string
  id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  priceAfterDiscount?: number
  imageCover: string
  category: CategoryType
  brand: BrandType
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
}

export type SubcategoryType = {
  _id: string
  name: string
  slug: string
  category: string
}

export type CategoryType = {
  _id: string
  name: string
  slug: string
  image: string
}

export type BrandType = {
  _id: string
  name: string
  slug: string
  image: string
}