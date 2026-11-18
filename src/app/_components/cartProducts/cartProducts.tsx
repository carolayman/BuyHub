'use client'

import React, { useTransition } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Sprout,
  ChevronRight,
} from 'lucide-react'
import { CartType } from '@/types/cart.types'
import RemoveProductBtn from '../RemoveProductBtn/RemoveProductBtn'
import ClearAllBtn from '../ClearAllBtn/ClearAllBtn'
import ProductQuantity from '../ProductQuantity/ProductQuantity'
import CheckOutBtn from '../CheckOutBtn/CheckOutBtn'
import ApplyCouponForm from '../ApplyCouponForm/ApplyCouponForm'

export default function CartProducts({ cart }: { cart: CartType }) {
  const data = cart.data
  const [isPending] = useTransition()

  const products = data.products
  const totalItems = products.reduce((total, item) => total + item.count, 0)
  const totalPrice = data.totalCartPrice

  const formatPrice = (price: number) => price.toLocaleString('en-US')

  if (products.length === 0) {
    return (
      <main className="relative flex min-h-[calc(100svh-76px)] items-center justify-center overflow-hidden bg-white px-5 py-8 sm:px-6 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-50 blur-3xl sm:h-80 sm:w-80" />
          <div className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-emerald-50 blur-3xl sm:h-80 sm:w-80" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent" />
        </div>

        <div className="relative w-full max-w-5xl">
          <div className="grid items-center gap-4 md:grid-cols-2 md:gap-8">
            {/* Illustration (first on mobile, smaller to keep CTA above the fold) */}
            <div className="order-1 flex justify-center md:order-2">
              <div className="relative flex aspect-square w-full max-w-[220px] items-center justify-center sm:max-w-[320px]">
                <div className="absolute inset-3 rounded-full border border-emerald-200/70 sm:inset-5" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-50 sm:inset-12" />

                <div className="absolute right-8 top-9 h-2.5 w-2.5 rounded-full bg-emerald-400 sm:right-10 sm:top-12 sm:h-3 sm:w-3" />
                <div className="absolute left-9 top-14 h-2 w-2 rounded-full bg-emerald-300 sm:left-12 sm:top-20" />
                <div className="absolute bottom-12 right-10 h-2 w-2 rounded-full bg-emerald-400 sm:bottom-16 sm:right-14" />
                <div className="absolute bottom-16 left-12 h-2.5 w-2.5 rounded-full bg-emerald-200 sm:bottom-24 sm:left-16 sm:h-3 sm:w-3" />

                <div className="absolute right-4 top-14 flex h-10 w-10 rotate-12 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-500 shadow-lg shadow-emerald-900/10 sm:right-8 sm:top-20 sm:h-12 sm:w-12">
                  <Sparkles size={19} strokeWidth={1.6} />
                </div>

                <div className="absolute bottom-12 left-4 flex h-10 w-10 -rotate-12 items-center justify-center rounded-2xl border border-gray-100 bg-white text-emerald-700 shadow-lg shadow-emerald-900/5 sm:bottom-16 sm:left-8 sm:h-11 sm:w-11">
                  <Sprout size={19} strokeWidth={1.6} />
                </div>

                <div className="group relative flex h-32 w-28 items-center justify-center rounded-[24px] bg-gradient-to-br from-emerald-600 via-emerald-600 to-emerald-800 shadow-xl shadow-emerald-900/20 transition-transform duration-500 hover:-rotate-3 sm:h-48 sm:w-44 sm:rounded-[30px]">
                  <div className="absolute -top-6 h-10 w-14 rounded-t-full border-[5px] border-b-0 border-emerald-700 transition-transform duration-500 group-hover:-translate-y-1 sm:-top-8 sm:h-14 sm:w-20 sm:border-[7px]" />
                  <div className="absolute inset-2 rounded-[18px] border border-white/15 sm:rounded-[24px]" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-emerald-50 sm:h-20 sm:w-20 sm:rounded-3xl">
                    <ShoppingBag className="h-7 w-7 sm:h-10 sm:w-10" strokeWidth={1.35} />
                  </div>
                  <span className="absolute bottom-3 text-[9px] font-extrabold uppercase tracking-[0.25em] text-emerald-100 sm:bottom-5 sm:text-[10px]">
                    BuyHub
                  </span>
                </div>
              </div>
            </div>

            {/* Copy */}
            <div className="order-2 text-center md:order-1 md:text-left">
              <p className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                YOUR CART IS WAITING
              </p>

              <h1 className="text-[2rem] font-black leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                Nothing here yet?
                <br />
                <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-700 bg-clip-text text-transparent">
                  Fill up your bag.
                </span>
              </h1>

              <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-gray-500 sm:mt-4 sm:max-w-sm sm:leading-7 sm:text-base md:mx-0">
                Looks like you haven&apos;t added anything to your cart yet.
                Find something you love and make it yours.
              </p>

              <Link
                href="/products"
                className="group mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-emerald-800 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg active:translate-y-0 active:scale-[0.98] sm:w-auto"
              >
                Start shopping
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          {/* Breadcrumb: hidden on very small screens to save vertical space */}
          <nav className="mb-4 hidden items-center gap-2 text-xs text-gray-500 min-[400px]:flex sm:mb-5 sm:text-sm">
            <Link href="/" className="transition hover:text-emerald-700">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="font-medium text-gray-900">Shopping Cart</span>
          </nav>

          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 sm:h-12 sm:w-12">
                <ShoppingBag size={20} />
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold leading-tight text-gray-900 sm:text-2xl">
                  Shopping Cart
                </h1>
                <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <ClearAllBtn />
            </div>
          </div>
        </div>
      </header>

      {/* Extra bottom padding on mobile so the sticky checkout bar never covers content */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-32 pt-4 sm:px-5 sm:py-7 lg:px-6 lg:pb-7">
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="min-w-0 lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:rounded-3xl">
              <div className="hidden grid-cols-12 items-center gap-3 border-b border-emerald-100 bg-emerald-50/70 px-5 py-4 text-[11px] font-bold uppercase tracking-wider text-emerald-800 sm:grid">
                <span className="col-span-5 pl-3">Product details</span>
                <span className="col-span-3 text-center">Quantity</span>
                <span className="col-span-3 text-right">Subtotal</span>
                <span className="col-span-1" />
              </div>

              <div className="divide-y divide-gray-100 px-3 sm:px-4">
                {products.map((item) => (
                  <article
                    key={item._id}
                    className={`py-3.5 transition-opacity sm:grid sm:grid-cols-12 sm:items-center sm:gap-2 sm:py-5 ${
                      isPending ? 'pointer-events-none opacity-60' : ''
                    }`}
                  >
                    {/* Product info */}
                    <div className="flex min-w-0 items-start gap-3 sm:col-span-5 sm:items-center">
                      <Link
                        href={`/products/${item.product._id}`}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 sm:h-16 sm:w-16 lg:h-[76px] lg:w-[76px]"
                      >
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          sizes="(max-width: 640px) 80px, 96px"
                          className="object-contain p-2 transition-transform duration-300 hover:scale-105"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        {item.product.brand?.name && (
                          <p className="mb-0.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700">
                            {item.product.brand.name}
                          </p>
                        )}

                        <Link
                          href={`/products/${item.product._id}`}
                          className="line-clamp-2 text-sm font-bold leading-5 text-gray-900 transition hover:text-emerald-700"
                        >
                          {item.product.title}
                        </Link>

                        <p className="mt-1 text-sm font-bold text-emerald-700">
                          {formatPrice(item.price)} EGP
                          <span className="ml-1 text-xs font-medium text-gray-400 sm:hidden">
                            each
                          </span>
                        </p>
                      </div>

                      <div className="-mr-1 -mt-1 shrink-0 sm:hidden">
                        <RemoveProductBtn id={item.product._id} />
                      </div>
                    </div>

                    {/* Mobile: quantity + subtotal share one compact row.
                        sm+: wrapper disappears so children become grid columns. */}
                    <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-3 py-2.5 sm:contents">
                      <div className="flex items-center sm:col-span-3 sm:justify-center">
                        <ProductQuantity count={item.count} id={item.product._id} />
                      </div>

                      <div className="text-right sm:col-span-3">
                        <span className="block text-[10px] font-medium uppercase tracking-wide text-gray-400 sm:hidden">
                          Subtotal
                        </span>
                        <span className="text-sm font-extrabold tabular-nums text-gray-950 sm:text-xs lg:text-sm">
                          {formatPrice(item.price * item.count)} EGP
                        </span>
                      </div>
                    </div>

                    <div className="hidden items-center justify-end sm:col-span-1 sm:flex">
                      <RemoveProductBtn id={item.product._id} />
                    </div>
                  </article>
                ))}
              </div>

              <div className="border-t border-gray-100 bg-gray-50/70 px-3 py-2 sm:px-4 sm:py-3">
                <Link
                  href="/products"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-xl px-2 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-50 sm:text-sm"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-100 bg-white transition group-hover:bg-emerald-100">
                    <ArrowLeft size={16} />
                  </span>
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>

          <aside className="min-w-0 lg:sticky lg:top-6 lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm sm:rounded-3xl">
              <div className="relative overflow-hidden bg-emerald-900 px-4 py-3.5 text-white sm:px-5 sm:py-5">
                <div className="absolute -right-6 -top-10 h-32 w-32 rounded-full bg-lime-400/20" />
                <div className="absolute -bottom-12 right-20 h-24 w-24 rounded-full bg-emerald-400/20" />

                <div className="relative flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-100 sm:text-xs">
                      Almost yours
                    </p>
                    <h2 className="mt-0.5 text-lg font-extrabold sm:mt-1 sm:text-2xl">
                      Your order
                    </h2>
                  </div>

                  <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold text-white">
                    <Sparkles size={14} className="text-lime-300" />
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold tabular-nums text-gray-900">
                      {formatPrice(totalPrice)} EGP
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-right text-xs font-semibold text-emerald-700">
                      Calculated at checkout
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-5">
                  <ApplyCouponForm />
                </div>

                <div className="my-4 border-t border-dashed border-gray-200" />

                <div className="rounded-xl bg-emerald-50 p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900">
                        Order total
                      </p>
                      <p className="mt-0.5 text-[11px] leading-4 text-gray-500 sm:mt-1 sm:text-xs sm:leading-5">
                        Shipping and taxes calculated at checkout
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xl font-extrabold tabular-nums tracking-tight text-emerald-800">
                        {formatPrice(totalPrice)}
                      </p>
                      <p className="text-xs font-bold text-emerald-700">EGP</p>
                    </div>
                  </div>
                </div>

                {/* Desktop/tablet checkout button (mobile uses the sticky bar below) */}
                <div className="mt-5 hidden lg:block">
                  <CheckOutBtn cartId={cart.cartId} />
                </div>

                {/* On small screens the checkout is in the sticky bar, but keep one here for tablets */}
                <div className="mt-5 hidden sm:block lg:hidden">
                  <CheckOutBtn cartId={cart.cartId} />
                </div>

                <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                  Need a hand?{' '}
                  <Link
                    href="/contact"
                    className="font-semibold text-emerald-700 underline underline-offset-2 transition hover:text-emerald-900"
                  >
                    Contact us
                  </Link>
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Sticky mobile checkout bar: total is always visible and checkout is one tap away */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)] backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <div className="min-w-0 shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Total · {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </p>
            <p className="text-lg font-extrabold leading-tight tabular-nums text-emerald-800">
              {formatPrice(totalPrice)}{' '}
              <span className="text-xs font-bold text-emerald-700">EGP</span>
            </p>
          </div>

          <div className="min-w-0 flex-1">
            <CheckOutBtn cartId={cart.cartId} />
          </div>
        </div>
      </div>
    </>
  )
}