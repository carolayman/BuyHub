import { GetSpecificBrand } from '@/api/BrandActions/GetSpecificBrand.action'
import { getAllProducts } from '@/api/ProductsActions/GetAllProducts.api'
import { ProductType } from '@/types/allProducts.types'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, ShoppingBag } from 'lucide-react'

export default async function BrandDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [brandResponse, productsResponse] = await Promise.all([
    GetSpecificBrand(id),
    getAllProducts(),
  ])

  const brand = brandResponse.data

  const products: ProductType[] = productsResponse.data.filter(
    (product: ProductType) => product.brand?._id === id
  )

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
            <Link
              href="/brands"
              className="transition-colors hover:text-white"
            >
              Brands
            </Link>
            <span className="text-white/50">/</span>
            <span className="font-medium text-white">{brand.name}</span>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-md ring-1 ring-white/25 sm:h-16 sm:w-16">
              <Image
                src={brand.image}
                alt={brand.name}
                fill
                priority
                sizes="64px"
                className="object-contain p-2"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                {brand.name}
              </h1>

              <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                Discover products from {brand.name} and find what you love.
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
              EXPLORE PRODUCTS
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {brand.name} Products
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Explore our {brand.name} collection and find your perfect match.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-green-100 bg-white px-4 py-2.5 shadow-sm">
            <ShoppingBag size={17} className="text-green-600" />
            <span className="text-sm font-bold text-gray-800">
              {products.length}
            </span>
            <span className="text-sm text-gray-500">Products</span>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute right-3 top-3 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    {brand.name}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 min-h-12 font-semibold text-gray-800 transition-colors group-hover:text-green-700">
                    {product.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-green-700">
                      {product.price} EGP
                    </span>

                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700 transition-all group-hover:bg-green-600 group-hover:text-white">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600">
              <ShoppingBag size={30} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-gray-800">
              No Products Yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              There are no products available for this brand yet. Check back
              soon for new arrivals.
            </p>

            <Link
              href="/brands"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Browse Brands
              <ArrowLeft size={16} />
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
