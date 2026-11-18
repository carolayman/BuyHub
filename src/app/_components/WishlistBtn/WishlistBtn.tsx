
'use client'

import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { toast } from 'react-toastify'
import { addProductToWishList } from '@/api/wishlistActions/AddProductToWishlist.action'
import { RemoveProductFromWishList } from '@/api/wishlistActions/RemoveProductFromWishlist.action'
import { useRouter } from 'next/navigation'

export default function WishlistBtn({
  id,
  isWishlisted,
}: {
  id: string
  isWishlisted: boolean
}) {
  const [loading, setLoading] = useState(false)
  const [wishlisted, setWishlisted] = useState(isWishlisted)
  const router = useRouter()

  useEffect(() => {
    setWishlisted(isWishlisted)
  }, [isWishlisted])

  async function toggleToWishList() {
    if (loading) return

    setLoading(true)

    try {
      const response = wishlisted
        ? await RemoveProductFromWishList({ id })
        : await addProductToWishList({ id })

      if (response.status !== 'success') {
        throw new Error(response.message || 'Failed to update wishlist')
      }

      setWishlisted(!wishlisted)

      toast.success(
        wishlisted
          ? 'Product removed from wishlist!'
          : 'Product added to wishlist!'
      )

      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update wishlist'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      disabled={loading}
      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-500 shadow-lg transition-all duration-200 hover:text-red-500 hover:shadow-md disabled:opacity-50"
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={toggleToWishList}
    >
      <Heart
        size={18}
        strokeWidth={1.8}
        color={wishlisted ? '#EF4444' : 'black'}
        fill={wishlisted ? '#EF4444' : 'none'}
      />
    </button>
  )
}
