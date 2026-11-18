
export default function Loading() {
  return (
    <main className="min-h-screen pb-16">
      <section className="relative mx-auto mt-5 w-[90%] overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <div className="mx-auto w-[90%] py-8 sm:py-12">
          <div className="mb-6 h-5 w-36 animate-pulse rounded bg-white/20" />

          <div className="flex items-center gap-4 sm:gap-5">
            <div className="h-14 w-14 shrink-0 animate-pulse rounded-2xl bg-white/20 sm:h-16 sm:w-16" />

            <div className="flex-1">
              <div className="h-8 w-52 max-w-full animate-pulse rounded-lg bg-white/30 sm:h-10 sm:w-72" />
              <div className="mt-3 h-4 w-64 max-w-full animate-pulse rounded bg-white/20" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 w-[90%]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="mb-3 h-4 w-36 animate-pulse rounded bg-green-100" />
            <div className="h-8 w-64 max-w-full animate-pulse rounded-lg bg-gray-200" />
            <div className="mt-3 h-4 w-52 max-w-full animate-pulse rounded bg-gray-100" />
          </div>

          <div className="h-9 w-28 animate-pulse rounded-full bg-green-100" />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              <div className="aspect-[4/3] animate-pulse bg-gray-200" />

              <div className="flex items-center justify-between gap-2 p-3 sm:p-4">
                <div className="h-4 w-24 max-w-[70%] animate-pulse rounded bg-gray-200" />
                <div className="hidden h-3 w-12 animate-pulse rounded bg-green-100 sm:block" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
