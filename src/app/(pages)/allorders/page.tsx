
import { GetUserOrder } from "@/api/CheckoutActions/getUserOrders.atcion"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  PackageCheck,
  ShoppingBag,
  Truck,
} from "lucide-react"

interface OrderItem {
  _id: string
  count: number
  price: number
  product: {
    _id: string
    title: string
    imageCover: string
    brand?: { name: string }
  }
}

interface Order {
  _id: string
  id: number
  createdAt: string
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  shippingAddress: {
    details: string
    city: string
    phone: string
  }
  cartItems: OrderItem[]
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(price)

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date))

export default async function AllOrders() {
  const response = await GetUserOrder()
  const orders: Order[] = Array.isArray(response)
    ? response
    : ((response as { data?: Order[] })?.data ?? [])

  const totalOrders = orders.length
  const paidOrders = orders.filter((order) => order.isPaid).length
  const deliveredOrders = orders.filter((order) => order.isDelivered).length

  return (
    <main className="min-h-screen bg-gray-50/80 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 p-7 text-white shadow-xl shadow-green-900/10 sm:p-10">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-28 right-44 h-64 w-64 rounded-full bg-emerald-300/10 blur-2xl" />

          <div className="relative z-10 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/20">
                <PackageCheck className="h-4 w-4" />
                YOUR SHOPPING, ALL IN ONE PLACE
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                My Orders<span className="text-green-200">.</span>
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-green-50 sm:text-base">
                Keep track of your purchases, payment status, and deliveries.
                Everything you ordered, right here.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex w-fit shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-green-800 shadow-sm transition hover:bg-green-50"
            >
              Continue shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Total orders</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <ShoppingBag className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{totalOrders}</p>
            <p className="mt-1 text-xs text-gray-400">All your purchases</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Paid orders</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">{paidOrders}</p>
            <p className="mt-1 text-xs text-gray-400">Payment confirmed</p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">Delivered</p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Truck className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900">
              {deliveredOrders}
            </p>
            <p className="mt-1 text-xs text-gray-400">Successfully delivered</p>
          </div>
        </div>

        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Order history</h2>
            <p className="mt-1 text-sm text-gray-500">
              {totalOrders} {totalOrders === 1 ? "order" : "orders"} found
            </p>
          </div>

          <span className="hidden items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-gray-500 ring-1 ring-gray-200 sm:inline-flex">
            <Package className="h-4 w-4 text-green-700" />
            Latest purchases
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-green-50 text-green-700">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">
              Your order history is waiting
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              You haven&apos;t placed any orders yet. Find something you love
              and your purchases will appear here.
            </p>
            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
            >
              Explore products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const itemCount = order.cartItems.reduce(
                (total, item) => total + item.count,
                0,
              )

              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="flex flex-col gap-5 border-b border-gray-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Order number
                        </span>
                        <span className="font-bold text-gray-900">
                          #{order.id}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4" />
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <ShoppingBag className="h-4 w-4" />
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          order.isPaid
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {order.isPaid ? (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        ) : (
                          <Clock3 className="h-3.5 w-3.5" />
                        )}
                        {order.isPaid ? "Paid" : "Payment pending"}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                          order.isDelivered
                            ? "bg-green-50 text-green-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        <Truck className="h-3.5 w-3.5" />
                        {order.isDelivered ? "Delivered" : "On its way"}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_270px]">
                    <div className="min-w-0 space-y-4">
                      {order.cartItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex min-w-0 items-center gap-4"
                        >
                          <div className="flex h-24 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-50 ring-1 ring-gray-100 sm:h-28 sm:w-24">
                            <img
                              src={item.product.imageCover}
                              alt={item.product.title}
                              className="h-full w-full object-contain p-1"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            {item.product.brand?.name && (
                              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-green-700">
                                {item.product.brand.name}
                              </p>
                            )}
                            <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-gray-900 sm:text-base">
                              {item.product.title}
                            </h3>
                            <p className="mt-2 text-xs text-gray-500">
                              Quantity: {item.count}
                            </p>
                          </div>

                          <p className="shrink-0 text-sm font-bold text-gray-900">
                            {formatPrice(item.price * item.count)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <aside className="flex flex-col rounded-2xl bg-gray-50 p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <MapPin className="h-4 w-4 text-green-700" />
                        Delivery address
                      </div>

                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        {order.shippingAddress.details}
                        {order.shippingAddress.city
                          ? `, ${order.shippingAddress.city}`
                          : ""}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {order.shippingAddress.phone}
                      </p>

                      <div className="my-5 border-t border-dashed border-gray-200" />

                      <div className="flex items-center justify-between gap-3 text-xs text-gray-500">
                        Payment method
                        <span className="font-semibold capitalize text-gray-700">
                          {order.paymentMethodType}
                        </span>
                      </div>

                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div>
                          <p className="text-xs text-gray-500">Order total</p>
                          <p className="mt-1 text-xl font-bold text-green-800">
                            {formatPrice(order.totalOrderPrice)}
                          </p>
                        </div>
                      </div>
                    </aside>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:px-6">
                    <p className="text-xs text-gray-400">
                      Thank you for shopping with BuyHub.
                    </p>
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 transition hover:text-green-900"
                    >
                      Shop more
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
