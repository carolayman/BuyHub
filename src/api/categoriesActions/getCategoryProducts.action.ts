'use server'

export async function GetSubCategoryProducts(subCategoryId: string) {
  const firstResponse = await fetch(
    'https://ecommerce.routemisr.com/api/v1/products',
    { cache: 'no-store' }
  )

  if (!firstResponse.ok) {
    throw new Error('Failed to fetch products')
  }

  const firstData = await firstResponse.json()

  const totalPages = firstData.metadata.numberOfPages

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      fetch(
        `https://ecommerce.routemisr.com/api/v1/products?page=${index + 2}`,
        { cache: 'no-store' }
      ).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        return response.json()
      })
    )
  )

  const allProducts = [
    ...firstData.data,
    ...remainingPages.flatMap((page) => page.data),
  ]

  const filteredProducts = allProducts.filter((product: any) =>
    product.subcategory?.some(
      (subcategory: any) => subcategory._id === subCategoryId
    )
  )

  console.log('Total Products:', allProducts.length)
  console.log('Matched Products:', filteredProducts.length)

  return {
    ...firstData,
    results: filteredProducts.length,
    data: filteredProducts,
  }
}