'use client'

import React, { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { RemoveProductFromCart } from '@/api/cartActions/removeProductFromCart.action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function RemoveProductBtn({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function RemoveProduct(id: string) {
    startTransition(async () => {
      try {
        const response = await RemoveProductFromCart(id)

        if (response.status === 'success') {
          toast.success(response.message)
          router.refresh()
        } else {
          toast.error('Failed to remove product')
        }
      } catch {
        toast.error('Failed to remove product')
      }
    })
  }

  return (
    <>
    <button
        type="button"
        aria-label="Remove product from cart"
        title="Remove item"
        onClick={() => RemoveProduct(id)}
        disabled={isPending}
        className="hidden h-9 w-9 items-center justify-center justify-self-end rounded-xl text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-50 sm:col-span-1 sm:flex"
      >
        <Trash2 size={17} strokeWidth={2} />
      </button> 
    </>
  )
}