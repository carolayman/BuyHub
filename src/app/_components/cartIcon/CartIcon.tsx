
import { getLoggedUserCart } from '@/api/cartActions/getLoggedUserCart.action'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default async function CartIcon() {
    let count = 0

    try {
        const response = await getLoggedUserCart()
        count = response?.data?.products?.reduce(
            (total: number, item: { count: number }) => total + item.count,
            0
        ) ?? 0
    } catch {
        count = 0
    }

    return (
        <Link
            href="/cart"
            aria-label={`Shopping Cart, ${count} items`}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
        >
            <ShoppingCart className="h-5.5 w-5.5" strokeWidth={1.8} />

            {count > 0 && (
                <span className="absolute right-0.5 top-2 flex h-[17px] min-w-[17px] -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full border-2 border-white bg-green-500 px-1 text-[9px] font-bold leading-none text-white">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Link>
    )
}
