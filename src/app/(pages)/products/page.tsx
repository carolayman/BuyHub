
import { getAllProducts } from "@/api/ProductsActions/GetAllProducts.api";
import { Package } from "lucide-react";
import AllProducts from "@/app/_components/allProducts/allProducts";

export default async function Products() {
  const data = await getAllProducts();

  return (
    <>
      <title>Products</title>

      <section className="relative mx-auto mt-5 w-[90%] overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white shadow-lg">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto w-[90%] py-8 sm:py-12">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/75">
            <a href="/" className="transition-colors hover:text-white">
              Home
            </a>
            <span className="text-white/50">/</span>
            <span className="font-medium text-white">All Products</span>
          </nav>

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 shadow-md ring-1 ring-white/25 backdrop-blur-md sm:h-16 sm:w-16">
              <Package size={28} strokeWidth={1.8} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                All Products
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-white/85 sm:text-base">
                Explore our complete product collection
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-[90%] py-8 sm:py-10">
        <AllProducts />
      </main>
    </>
  );
}