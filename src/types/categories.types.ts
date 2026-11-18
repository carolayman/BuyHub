export interface CategoryType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}

export type CategoriesResponse = {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
  }
  data: CategoryType[]
}

export type SubCategoryType = {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}

export type SubCategoriesResponse = {
  results: number
  metadata: {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage?: number
  }
  data: SubCategoryType[]
}