
export type CartType = {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartData
}

export type CartData = {
  _id: string
  cartOwner: string
  products: CartProduct[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export type CartProduct = {
  count: number
  _id: string
  product: Product
  price: number
}

export type Product = {
  subcategory: {
    _id: string
    name: string
    slug: string
    category: string
  }[]
  _id: string
  title: string
  slug: string
  quantity: number
  imageCover: string
  category: {
    _id: string
    name: string
    slug: string
    image: string
  }
  brand: {
    _id: string
    name: string
    slug: string
    image: string
  }
  ratingsAverage: number
  id: string
}
