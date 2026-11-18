
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AddProductToCart } from '../../../api/cartActions/AddToCart.Action'
import { Plus, LoaderCircle, ShoppingCart } from 'lucide-react'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { getSession } from 'next-auth/react'

export default function AddToCartButton({id,isDetail = false,}: {id: string , isDetail?: boolean}) {
 
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleAddToCart() {

    const session = await getSession()

    if(!session ){
      router.push("/login")
    }

    if (loading) return

    try {
      setLoading(true)
      await AddProductToCart(id)
      toast.success('Product added to cart!')
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add product to cart'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={isDetail ? '' : 'px-4 pb-4 pt-2'}>
      <Button
        type="button"
        onClick={handleAddToCart}
        disabled={loading}
        className={`w-full font-semibold text-white transition-all duration-200 disabled:cursor-wait disabled:opacity-70 ${
          isDetail
            ? 'h-14 rounded-2xl gap-3 bg-green-600 text-base shadow-lg shadow-green-600/25 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-green-600/35 active:translate-y-0 active:scale-[0.98]'
            : 'h-10 rounded-lg gap-2 bg-green-600 text-sm shadow-sm hover:bg-green-700 hover:shadow-md active:scale-[0.98]'
        }`}
      >
        {loading ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            <span>Adding to cart...</span>
          </>
        ) : (
          <>
            {isDetail ? <ShoppingCart size={21} /> : <Plus size={17} />}
            <span>Add to cart</span>
          </>
        )}
      </Button>
    </div>
  )
}
