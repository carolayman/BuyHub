'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, ShoppingCart, Trash2, Loader2 } from 'lucide-react'
import { WishlistProductType } from '@/types/wishlist.types'
import { AddProductToCart } from '@/api/cartActions/AddToCart.Action'
import { useRouter } from 'next/navigation'
import { RemoveProductFromWishList } from '@/api/wishlistActions/RemoveProductFromWishlist.action'

interface WishlistProductProps {
  product: WishlistProductType
  onRemove?: (productId: string) => void
}

export default function WishlistProduct({ product, onRemove }: WishlistProductProps) {

  const [isAdded, setIsAdded] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  if (!product) {
    console.error('WishlistProduct: product is undefined')
    return null
  }

  const hasDiscount =
    product.priceAfterDiscount !== undefined &&
    product.priceAfterDiscount !== null &&
    product.priceAfterDiscount > 0 &&
    product.priceAfterDiscount < product.price

  const currentPrice = hasDiscount
    ? product.priceAfterDiscount!
    : product.price

  const discountPercentage = hasDiscount
    ? Math.round(((product.price - currentPrice) / product.price) * 100)
    : 0

  const inStock = product.quantity > 0

  async function handleAddToCart() {
    if (!inStock || isAdding) return

    setIsAdding(true)

    try {
      const response = await AddProductToCart(product._id)

      if (response.status === 'success') {
        setIsAdded(true)
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to add product to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  async function RemoveFromWishlist(id: string) {
    try {
      const response = await RemoveProductFromWishList({ id })

      if (response.status === 'success') {
        router.refresh()
      }
    } catch (error) {
      console.error('Failed to remove product from wishlist:', error)
    }
  }

  return (
    <div
      className={`grid grid-cols-1 items-center gap-4 p-4 transition-all hover:bg-gray-50/70 sm:p-5 md:grid-cols-12 md:gap-4 md:px-6 ${
        isPending ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <div className="flex min-w-0 items-center gap-3 sm:gap-4 md:col-span-6">
        <Link
          href={`/products/${product._id}`}
          aria-label={`View ${product.title} details`}
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-24 sm:w-24"
        >
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 80px, 96px"
            className="object-contain p-2 transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <div className="min-w-0 flex-1">
          {product.brand?.name && (
            <p className="mb-1 text-xs font-medium text-emerald-700">
              {product.brand.name}
            </p>
          )}

          <Link
            href={`/products/${product._id}`}
            className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 transition hover:text-emerald-700 sm:text-base"
          >
            {product.title}
          </Link>

          <p className="mt-1 truncate text-xs text-gray-400 sm:text-sm">
            {product.category?.name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-center">
        <span className="text-sm text-gray-500 md:hidden">Price</span>

        <div className="flex flex-col items-end gap-0.5 md:items-center">
          <span className="whitespace-nowrap text-sm font-bold text-gray-900 sm:text-base">
            {currentPrice.toLocaleString('en-US')} EGP
          </span>

          {hasDiscount && (
            <div className="flex flex-wrap items-center justify-end gap-1.5">
              <span className="whitespace-nowrap text-xs text-gray-400 line-through">
                {product.price.toLocaleString('en-US')} EGP
              </span>

              <span className="inline-flex items-center rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-bold text-rose-600 sm:text-xs">
                -{discountPercentage}%
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-center">
        <span className="text-sm text-gray-500 md:hidden">Status</span>

        <span
          className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
            inStock
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              inStock ? 'bg-emerald-500' : 'bg-gray-400'
            }`}
          />
          {inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3 md:col-span-2 md:justify-center md:border-0 md:pt-0">
        {isAdded ? (
          <Link
            href="/cart"
            aria-label="View cart"
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-50 px-3 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 sm:flex-none sm:px-4"
          >
            <Check size={16} className="text-emerald-600" />
            <span className="sm:hidden">In Cart</span>
          </Link>
        ) : (
          <button
            type="button"
            disabled={!inStock || isAdding}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3 text-xs font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 sm:flex-none sm:px-4"
          >
            {isAdding ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                <ShoppingCart size={16} />
                <span className="md:hidden">Add to Cart</span>
              </>
            )}
          </button>
        )}

        <button
          type="button"
          onClick={()=>RemoveFromWishlist(product._id)}
          disabled={isPending}
          title="Remove from wishlist"
          aria-label={`Remove ${product.title} from wishlist`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-500 disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  )
}