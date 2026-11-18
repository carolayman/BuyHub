import { GetLoggedUserWishList } from '@/api/wishlistActions/getLoggedUserWishlist'
import { Heart  } from 'lucide-react'
import Link from 'next/link'

export default async function WishlistIcon() {
    let count = 0

    try {
        const response = await GetLoggedUserWishList()
        count = response?.count ?? response?.data?.count ?? 0
    } catch {
        count = 0
    }

    return (
        <Link
            href="/wishlist"
            aria-label={`Wishlist, ${count} items`}
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-600 transition-all duration-200 hover:bg-green-50 hover:text-green-600"
        >
            <Heart  className="h-6 w-6" strokeWidth={1.8} />

            {count > 0 && (
                <span className="absolute right-0.5 top-2 flex h-[17px] min-w-[17px] -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full border-2 border-white bg-green-500 px-1 text-[9px] font-bold leading-none text-white">
                    {count > 99 ? '99+' : count}
                </span>
            )}
        </Link>
    )
}
