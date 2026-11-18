'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2 } from 'lucide-react'
import { getAllProducts } from '@/api/ProductsActions/GetAllProducts.api' 

type SearchProduct = {
  _id: string
  title: string
  imageCover?: string
  price?: number
  category?: { name?: string }
  brand?: { name?: string }
}

let productsCache: SearchProduct[] | null = null
let productsPromise: Promise<SearchProduct[]> | null = null

const loadProducts = async (): Promise<SearchProduct[]> => {
  if (productsCache) return productsCache;

  if (!productsPromise) {
    const promise = getAllProducts()
      .then((res: { data: SearchProduct[] }) => {
        productsCache = res.data;
        return res.data;
      })
      .catch((err: unknown) => {
        productsPromise = null;
        throw err;
      });

    productsPromise = promise;
  }

  return productsPromise;
};

export default function SearchBar({
  className = '',
  onNavigate,
}: {
  className?: string
  onNavigate?: () => void
}) {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [query, setQuery] = useState('')
  const [debounced, setDebounced] = useState('')
  const [products, setProducts] = useState<SearchProduct[]>(productsCache ?? [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 200)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleFocus = async () => {
    setOpen(true)
    if (productsCache) {
      setProducts(productsCache)
      return
    }
    try {
      setLoading(true)
      setError(false)
      setProducts(await loadProducts())
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const results = useMemo(() => {
    if (!debounced) return []
    return products
      .filter((p) =>
        [p.title, p.category?.name, p.brand?.name]
          .filter(Boolean)
          .some((v) => v!.toLowerCase().includes(debounced))
      )
      .slice(0, 6)
  }, [debounced, products])

  const close = () => {
    setOpen(false)
    setQuery('')
    onNavigate?.()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (results[0]) {
      router.push(`/products/${results[0]._id}`)
      close()
    }
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} role="search">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={handleFocus}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-9 text-sm text-gray-800 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {open && (query || loading) && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-gray-100 bg-white p-2 shadow-lg md:min-w-88">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-500">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading products...
            </div>
          )}

          {error && !loading && (
            <p className="py-6 text-center text-sm text-red-500">
              Couldn&apos;t load products. Try again.
            </p>
          )}

          {!loading && !error && debounced && results.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-500">
              No products found for &quot;{query}&quot;
            </p>
          )}

          {!loading &&
            results.map((p) => (
              <Link
                key={p._id}
                href={`/products/${p._id}`}
                onClick={close}
                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-green-50"
              >
                {p.imageCover && (
                  <img
                    src={p.imageCover}
                    alt={p.title}
                    className="h-12 w-12 shrink-0 rounded-lg bg-gray-100 object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-800">
                    {p.title}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {p.category?.name}
                    {p.brand?.name ? ` · ${p.brand.name}` : ''}
                  </p>
                </div>
                {p.price !== undefined && (
                  <span className="shrink-0 text-sm font-semibold text-green-600">
                    {p.price} EGP
                  </span>
                )}
              </Link>
            ))}
        </div>
      )}
    </div>
  )
}