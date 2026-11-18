'use server'

export async function getAllCategories() {
  const response = await fetch(
    'https://ecommerce.routemisr.com/api/v1/categories',
    {
      method: 'GET',
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch categories')
  }

  return await response.json()
}