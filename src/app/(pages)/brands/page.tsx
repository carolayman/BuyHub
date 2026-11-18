import { GetAllBrands } from '@/api/BrandActions/GetAllBrands.action'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Store } from 'lucide-react'

export default async function Brands() {
  const response = await GetAllBrands()
  const brands = response.data

  return (
    <main className="min-h-screen pb-16">
      <section className="relative mx-auto mt-5 w-[90%] overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white shadow-lg">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto w-[90%] py-8 sm:py-12">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/75">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span className="text-white/50">/</span>
            <span className="font-medium text-white">Brands</span>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-md ring-1 ring-white/25 backdrop-blur-md sm:h-16 sm:w-16">
              <Store size={30} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                Our Brands
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                Discover your favorite brands and explore their collections.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-[90%]">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-green-700">
              <span className="h-1 w-7 rounded-full bg-green-500" />
              EXPLORE BRANDS
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Find Your Favorite Brand
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Browse our collection of trusted brands.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-100 bg-white px-4 py-2.5 shadow-sm">
            <Store size={17} className="text-green-600" />
            <span className="text-sm font-bold text-gray-800">
              {brands.length}
            </span>
            <span className="text-sm text-gray-500">Brands</span>
          </div>
        </div>

        {brands.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {brands.map((brand: any) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-green-50 transition-transform duration-500 group-hover:scale-150" />

                <div className="relative flex h-24 items-center justify-center sm:h-28">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={130}
                    height={90}
                    className="max-h-20 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="relative mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
                  <h3 className="truncate text-sm font-bold text-gray-800 transition-colors group-hover:text-green-700">
                    {brand.name}
                  </h3>

                  <ArrowUpRight
                    size={17}
                    className="shrink-0 text-gray-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-600"
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <Store size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-800">
              No Brands Available
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              There are no brands available right now. Check back soon.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
