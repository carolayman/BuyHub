
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Phone,
  Building2,
  MapPinned,
  CreditCard,
  Banknote,
  Check,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  checkoutSchema,
  checkoutSchemaType,
} from "@/app/schema/checkOut.schema"
import { CheckOutSession } from "@/api/CheckoutActions/checkoutSession.action"
import { CreateCashOrder } from "@/api/CheckoutActions/createCashOrder.action"
import {
  GetUserAddresses,
  type Address,
} from "@/api/addresses/getUserAddresses.action"
import { getLoggedUserCart } from "@/api/cartActions/getLoggedUserCart.action"

type PaymentMethod = "cash" | "visa"

const FormFields = [
  {
    name: "details",
    label: "Full address",
    placeholder: "Street, building, apartment...",
    icon: MapPin,
    autoComplete: "street-address",
    full: true,
  },
  {
    name: "city",
    label: "City",
    placeholder: "e.g. Cairo",
    icon: Building2,
    autoComplete: "address-level2",
    full: false,
  },
  {
    name: "postalCode",
    label: "Postal code",
    placeholder: "Enter postal code",
    icon: MapPinned,
    autoComplete: "postal-code",
    full: false,
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "01xxxxxxxxx",
    icon: Phone,
    autoComplete: "tel",
    full: true,
  },
] as const

const PaymentOptions = [
  {
    value: "cash" as PaymentMethod,
    title: "Cash on Delivery",
    desc: "Pay when your order arrives",
    Icon: Banknote,
  },
  {
    value: "visa" as PaymentMethod,
    title: "Visa / Card",
    desc: "Pay securely online",
    Icon: CreditCard,
  },
]

const Benefits = [
  {
    icon: Truck,
    title: "Convenient delivery",
    description: "Your order, delivered to your door",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description: "Your order details stay protected",
  },
]

export default function CheckOut() {
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  )
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true)
  const [totalCartPrice, setTotalCartPrice] = useState<number | null>(null)
  const [isLoadingPrice, setIsLoadingPrice] = useState(true)

  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const form = useForm<checkoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
    resolver: zodResolver(checkoutSchema),
    mode: "all",
  })

  function applyAddress(address: Address) {
    setSelectedAddress(address._id)

    form.setValue("details", address.details, {
      shouldValidate: true,
      shouldDirty: true,
    })
    form.setValue("city", address.city, {
      shouldValidate: true,
      shouldDirty: true,
    })
    form.setValue("phone", address.phone, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  useEffect(() => {
    let ignore = false

    async function loadCartPrice() {
      try {
        const response = await getLoggedUserCart()
        const price = Number(response?.data?.totalCartPrice)

        if (!ignore && Number.isFinite(price)) {
          setTotalCartPrice(price)
        }
      } catch {
        if (!ignore) {
          toast.error("Unable to load order total")
        }
      } finally {
        if (!ignore) {
          setIsLoadingPrice(false)
        }
      }
    }

    loadCartPrice()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadAddresses() {
      try {
        const data = await GetUserAddresses()
        if (ignore) return
        setAddresses(data)
        if (data[0]) applyAddress(data[0])
      } catch {
      } finally {
        if (!ignore) setIsLoadingAddresses(false)
      }
    }

    loadAddresses()

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const sub = form.watch((_, { type }) => {
      if (type === "change") setSelectedAddress(null)
    })

    return () => sub.unsubscribe()
  }, [form])

  const handleCheckOut = async (values: checkoutSchemaType) => {
    if (!paymentMethod) {
      toast.error("Please select a payment method")
      return
    }

    setIsLoading(true)

    const shippingAddress = {
      details: values.details,
      phone: values.phone,
      city: values.city,
    }

    try {
      if (paymentMethod === "cash") {
        const response = await CreateCashOrder(id, shippingAddress)

        if (response.status === "success") {
          toast.success("Your order has been placed successfully!")
          window.location.href = "/allorders"
        } else {
          toast.error("Unable to place your order. Please try again.")
        }
      } else {
        const response = await CheckOutSession(
          id,
          window.location.origin,
          shippingAddress,
        )

        if (response.status === "success" && response.session?.url) {
          toast.success("Redirecting to payment...")
          window.location.href = response.session.url
        } else {
          toast.error("Unable to create payment session")
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_55%),linear-gradient(180deg,#f7faf7_0%,#eef7f1_100%)] px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[32px] border border-emerald-100 bg-white shadow-[0_32px_80px_-24px_rgba(15,118,110,0.25)] lg:grid-cols-[1.1fr_1.4fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-800 via-green-700 to-emerald-600 p-6 text-white sm:p-8 lg:flex lg:p-10">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[26px] border-white/10" />
          <div className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full bg-emerald-300/20 blur-sm" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_30%)]" />

          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/20 backdrop-blur-sm">
                <ShoppingCart className="h-5 w-5" />
              </span>
              <span className="text-2xl font-bold tracking-tight">
                Buy<span className="text-emerald-100">Hub</span>
              </span>
            </Link>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-50">
              <MapPin className="h-3.5 w-3.5" />
              Delivery
            </div>

            <h2 className="mt-6 max-w-sm text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              Almost there. We&apos;ll handle the rest.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-emerald-50/90">
              Add your shipping details and your order will move from cart to
              doorstep in no time.
            </p>
          </div>

          <div className="relative z-10 space-y-4 pt-8">
            {Benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-0.5 text-xs text-emerald-50/80">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="relative z-10 pt-6 text-xs font-medium uppercase tracking-[0.2em] text-emerald-100/90">
            Everyday essentials, delivered better.
          </p>
        </aside>

        <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-3 lg:hidden"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
              <ShoppingCart className="h-5 w-5" />
            </span>
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Buy<span className="text-emerald-600">Hub</span>
            </span>
          </Link>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                <MapPin className="h-3.5 w-3.5" />
                Checkout
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                Shipping details
              </h1>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-left shadow-sm shadow-emerald-100/50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Order total
              </p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {isLoadingPrice
                  ? "Loading..."
                  : totalCartPrice !== null
                    ? `${totalCartPrice.toLocaleString("en-EG")} EGP`
                    : "Unavailable"}
              </p>
            </div>
          </div>

          <form
            onSubmit={form.handleSubmit(handleCheckOut)}
            noValidate
            className="space-y-5"
          >
            {(isLoadingAddresses || addresses.length > 0) && (
              <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
                    Saved addresses
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Pick one to fill the form, or type a different address below.
                  </p>
                </div>

                {isLoadingAddresses ? (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {[0, 1].map((i) => (
                      <div
                        key={i}
                        className="h-28 animate-pulse rounded-2xl bg-slate-200/70"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {addresses.map((address) => {
                      const active = selectedAddress === address._id

                      return (
                        <button
                          key={address._id}
                          type="button"
                          disabled={isLoading}
                          aria-pressed={active}
                          onClick={() => applyAddress(address)}
                          className={`relative flex flex-col gap-2 rounded-2xl border p-4 text-left transition-all ${
                            active
                              ? "border-emerald-500 bg-emerald-50 shadow-[0_12px_25px_-15px_rgba(16,185,129,0.7)] ring-4 ring-emerald-500/10"
                              : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30"
                          }`}
                        >
                          {active && (
                            <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                              <Check className="h-3 w-3" />
                            </span>
                          )}

                          <div className="flex items-center gap-2.5 pr-6">
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                                active
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              <MapPin className="h-4 w-4" />
                            </span>
                            <span className="truncate text-sm font-bold text-slate-900">
                              {address.name}
                            </span>
                          </div>

                          <p className="line-clamp-2 text-sm leading-5 text-slate-600">
                            {address.details}
                          </p>

                          <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                              <Building2 className="h-3.5 w-3.5" />
                              {address.city}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5" />
                              {address.phone}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )}

            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
                Shipping address
              </h3>

              <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                {FormFields.map(
                  ({
                    name,
                    label,
                    placeholder,
                    icon: Icon,
                    autoComplete,
                    full,
                  }) => (
                    <div key={name} className={full ? "sm:col-span-2" : ""}>
                      <label
                        htmlFor={name}
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        {label}
                      </label>

                      <Controller
                        name={name}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1.5"
                          >
                            <div className="group relative">
                              <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-emerald-600" />
                              <Input
                                {...field}
                                id={name}
                                type="text"
                                placeholder={placeholder}
                                autoComplete={autoComplete}
                                aria-invalid={fieldState.invalid}
                                className="h-12 rounded-2xl border-slate-200 bg-slate-50/80 pl-10 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 hover:border-emerald-300 focus-visible:border-emerald-500 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-emerald-500/10 aria-invalid:border-red-400 aria-invalid:ring-4 aria-invalid:ring-red-500/10"
                              />
                            </div>
                            {fieldState.error && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-700">
                Payment method
              </h3>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {PaymentOptions.map(({ value, title, desc, Icon }) => {
                  const active = paymentMethod === value

                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={isLoading}
                      aria-pressed={active}
                      onClick={() => setPaymentMethod(value)}
                      className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all ${
                        active
                          ? "border-emerald-500 bg-emerald-50 shadow-[0_12px_25px_-15px_rgba(16,185,129,0.7)] ring-4 ring-emerald-500/10"
                          : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/30"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          active
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-900">
                          {title}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {desc}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <Button
                type="submit"
                disabled={isLoading}
                className="group h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(16,185,129,0.18)] transition hover:from-emerald-700 hover:to-green-700 hover:shadow-[0_4px_12px_rgba(16,185,129,0.22)] disabled:cursor-not-allowed disabled:opacity-70"              >
                {isLoading
                  ? "Please wait..."
                  : paymentMethod === "cash"
                    ? "Place Order"
                    : "Continue to payment"}
                {!isLoading && (
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </Button>

              <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to cart
                </Link>
                <p className="text-xs text-slate-400">
                  Double-check your address and phone number.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
