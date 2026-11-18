'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Tag } from 'lucide-react'
import { ApplyCouponToCart } from '@/api/CheckoutActions/applyCoupon.action'

export default function ApplyCouponForm() {
  const [coupon, setCoupon] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!coupon.trim()) {
      toast.error('Please enter a coupon code')
      return
    }

    setIsLoading(true)
    try {
      const response = await ApplyCouponToCart(coupon)
      console.log(response) 
      toast.success('Coupon applied!')
      setCoupon('')
      router.refresh() 
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to apply coupon',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-xl bg-emerald-50 p-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-gray-800">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
          <Tag size={16} />
        </span>
        Got a promo code?
      </div>

      <form onSubmit={handleApply} className="flex gap-2">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter code"
          aria-label="Promo code"
          disabled={isLoading}
          className="min-w-0 flex-1 rounded-lg border border-emerald-100 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-lg bg-emerald-800 px-3 text-xs font-bold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? 'Applying...' : 'Apply'}
        </button>
      </form>
    </div>
  )
}