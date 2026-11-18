"use client"
import React from 'react'
import { Trash2 } from 'lucide-react'
import { ClearUserCart } from '@/api/cartActions/clearCart.action'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'


export default function ClearAllBtn() {


    const router = useRouter()

    async function ClearCart(){
        const response = await ClearUserCart()
        if (response.status === "success") {
            toast.success(response.message || "Cart cleared successfully")
            router.refresh()
        }
        else {
            toast.error("Failed to clear cart")
        }
    }

  return (
    <>
            <button
              type="button"
              onClick={() => { ClearCart() }}
            //   disabled={isPending || products.length === 0}
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border-red-100 bg-red-50/50 border-2 px-4 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:border-red-200 hover:bg-red-100 hover:text-red-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 sm:self-center"
            >
              <Trash2 size={16} strokeWidth={1.8} />
              Clear all
            </button>
    </>
  )
}
