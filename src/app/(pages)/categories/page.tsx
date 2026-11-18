import Link from 'next/link'
import Image from 'next/image'
import { Shapes, ArrowUpRight, Sparkles } from 'lucide-react'
import { getAllCategories } from '@/api/categoriesActions/getAllCategories.action'
import type { CategoryType } from '@/types/categories.types'

export default async function Categories() {
  const response = await getAllCategories()
  const categories = response.data

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
            <span className="font-medium text-white">Categories</span>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-md ring-1 ring-white/25 backdrop-blur-md sm:h-16 sm:w-16">
              <Shapes size={28} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                Shop by Category
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                Discover our collections and find what you love.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-[90%]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-600">
              <Sparkles size={16} />
              EXPLORE BUYHUB
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Browse our categories
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Find exactly what you are looking for.
            </p>
          </div>

          <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            {categories.length} Categories
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {categories.map((category: CategoryType) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-100" />

                <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-green-700 shadow-md transition-all duration-300 group-hover:bg-green-600 group-hover:text-white">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
                <h3 className="text-sm font-bold text-gray-800 transition-colors group-hover:text-green-700 sm:text-base">
                  {category.name}
                </h3>

                <span className="hidden text-xs font-medium text-green-600 sm:block">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}