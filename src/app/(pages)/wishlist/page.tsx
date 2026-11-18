import { GetLoggedUserWishList } from '@/api/wishlistActions/getLoggedUserWishlist'
import WishlistProduct from '@/app/_components/WishlistProduct/WishlistProduct'
import { WishlistProductType } from '@/types/wishlist.types'
import { Heart, ArrowRight, Sparkles, Sprout, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function WhishList() {
  const response = await GetLoggedUserWishList()
  const products: WishlistProductType[] = response.data

  if (products.length === 0) {
    return (
      <main className="relative flex min-h-[calc(100vh-76px)] items-center justify-center overflow-hidden bg-white px-4 py-10 sm:px-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-lime-50 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-emerald-50/70 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent" />
        </div>

        <div className="relative w-full max-w-5xl">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-8">
            <div className="order-2 text-center md:order-1 md:text-left">
              <p className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                YOUR WISHLIST IS WAITING
              </p>

              <h1 className="text-4xl font-black leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Nothing
                <br />
                here yet?
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-700 bg-clip-text text-transparent">
                  Find your favorites.
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-gray-500 sm:text-base md:mx-0">
                Your wishlist is looking a little empty. Discover things you
                love, save your favorites, and keep them close for later.
              </p>

              <Link
                href="/products"
                className="group mt-5 inline-flex items-center justify-center gap-3 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg active:translate-y-0"
              >
                Explore Products
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="order-1 flex justify-center md:order-2">
              <div className="relative flex aspect-square w-full max-w-[300px] items-center justify-center sm:max-w-[320px]">
                <div className="absolute inset-5 rounded-full border border-emerald-200/70" />
                <div className="absolute inset-12 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-50" />

                <div className="absolute right-10 top-12 h-3 w-3 rounded-full bg-emerald-400" />
                <div className="absolute left-12 top-20 h-2 w-2 rounded-full bg-emerald-300" />
                <div className="absolute bottom-16 right-14 h-2 w-2 rounded-full bg-emerald-400" />
                <div className="absolute left-16 bottom-24 h-3 w-3 rounded-full bg-emerald-200" />

                <div className="absolute right-8 top-20 flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-500 shadow-lg shadow-emerald-900/10">
                  <Heart size={21} fill="currentColor" strokeWidth={1.6} />
                </div>

                <div className="absolute bottom-16 left-8 flex h-11 w-11 -rotate-12 items-center justify-center rounded-2xl border border-gray-100 bg-white text-emerald-700 shadow-lg shadow-emerald-900/5">
                  <Sprout size={21} strokeWidth={1.6} />
                </div>

                <div className="absolute left-9 top-14 flex h-9 w-9 -rotate-12 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-400 shadow-md">
                  <Sparkles size={17} strokeWidth={1.6} />
                </div>

                <div className="group relative flex h-44 w-40 items-center justify-center rounded-[30px] bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-800 shadow-xl shadow-emerald-900/20 transition-transform duration-500 hover:-rotate-3 sm:h-48 sm:w-44">
                  <div className="absolute -top-8 h-14 w-20 rounded-t-full border-[7px] border-b-0 border-emerald-700 transition-transform duration-500 group-hover:-translate-y-1" />

                  <div className="absolute inset-2 rounded-[24px] border border-white/15" />

                  <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-emerald-50">
                    <Heart size={42} fill="currentColor" strokeWidth={1.35} />
                  </div>

                  <span className="absolute bottom-5 text-[10px] font-extrabold uppercase tracking-[0.25em] text-emerald-100">
                    BuyHub
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50/70">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition hover:text-emerald-700">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-gray-900">Wishlist</span>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
              <Heart size={23} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Wishlist
              </h1>
              <p className="mt-0.5 text-sm text-gray-500">
                {products.length} {products.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-500 md:grid">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          <div className="divide-y divide-gray-100">
            {products.map((product) => (
              <WishlistProduct key={product._id} product={product} />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
          >
            <span>←</span> Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  )
}


// import { GetLoggedUserWishList } from '@/api/wishlistActions/getLoggedUserWishlist'
// import WishlistProduct from '@/app/_components/WishlistProduct/WishlistProduct'
// import { WishlistProductType } from '@/types/wishlist.types'
// import { Heart, ChevronRight } from 'lucide-react'
// import Link from 'next/link'

// export default async function WhishList() {
//   const response = await GetLoggedUserWishList()
//   const products: WishlistProductType[] = response.data

//   return (
//     <main className="min-h-screen bg-gray-50/70">
//       <header className="border-b border-gray-100 bg-white">
//         <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
//           <nav className="mb-5 flex items-center gap-2 text-sm text-gray-500">
//             <Link href="/" className="transition hover:text-emerald-700">
//               Home
//             </Link>
//             <ChevronRight size={14} />
//             <span className="font-medium text-gray-900">Wishlist</span>
//           </nav>

//           <div className="flex items-center gap-3">
//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500">
//               <Heart size={23} fill="currentColor" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 My Wishlist
//               </h1>
//               <p className="mt-0.5 text-sm text-gray-500">
//                 {products.length} {products.length === 1 ? 'item' : 'items'} saved
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//         {products.length > 0 ? (
//           <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//             <div className="hidden grid-cols-12 gap-4 border-b border-gray-100 bg-gray-50 px-6 py-4 text-sm font-semibold text-gray-500 md:grid">
//               <div className="col-span-6">Product</div>
//               <div className="col-span-2 text-center">Price</div>
//               <div className="col-span-2 text-center">Status</div>
//               <div className="col-span-2 text-center">Actions</div>
//             </div>

//             <div className="divide-y divide-gray-100">
//               {products.map((product) => (
//                 <WishlistProduct key={product._id} product={product} />
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-5 text-center">
//             <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
//               <Heart size={28} />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900">
//               Your wishlist is empty
//             </h2>
//             <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
//               Save your favorite finds here and come back to them anytime.
//             </p>
//             <Link
//               href="/products"
//               className="mt-5 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
//             >
//               Explore Products
//             </Link>
//           </div>
//         )}

//         <div className="mt-6">
//           <Link
//             href="/products"
//             className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
//           >
//             <span>←</span> Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </main>
//   )
// }
