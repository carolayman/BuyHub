
'use server'
import { CategoryType } from '@/types/categories.types'

export async function GetSpecificCategory(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    {
      method: 'GET',
      cache: 'no-store',
    }
  )

  if (!response.ok) {
    throw new Error('Failed to fetch category')
  }

  const data: { data: CategoryType } = await response.json()

  return data
}
