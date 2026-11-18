'use server'

export async function GetSpecificBrand(brandId: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`,
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