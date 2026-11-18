import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CheckOutBtn({cartId} : { cartId : string }) {
  return (
    <>

    <Link
        href={`/checkout/${cartId}`}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-extrabold text-white shadow-md shadow-emerald-700/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 active:translate-y-0"
    >
        Checkout
        <ArrowRight size={18} />
    </Link>
      
    </>
  )
}
