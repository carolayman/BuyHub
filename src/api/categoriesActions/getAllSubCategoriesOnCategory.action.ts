'use server'

export async function GetAllSubCategoriesOnCategory(categoryId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch subcategories')
  }

  return await response.json()
}