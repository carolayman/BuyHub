'use server'

export async function GetSpecificSubCategory(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/subcategories/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch subcategory')
  }

  return await response.json()
}