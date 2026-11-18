'use client'

import { useCallback, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-toastify'
import {
  MapPin,
  Plus,
  X,
  Phone,
  Building2,
  Tag,
  Trash2,
  Loader2,
  Save,
  Check,
} from 'lucide-react'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { AddAddress } from '@/api/addresses/addAddress.action'
import { RemoveAddress } from '@/api/addresses/deleteAddress.action'
import { GetUserAddresses  , type Address } from '@/api/addresses/getUserAddresses.action'
import AccountShell from '@/app/_components/AccountShell/AccountShell'

const schema = z.object({
  name: z.string().min(1, 'Give this address a name (e.g. Home)'),
  city: z.string().min(1, 'City is required'),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, 'Enter a valid Egyptian phone number'),
  details: z.string().min(5, 'Please add a few more address details'),
})

type FormValues = z.infer<typeof schema>

const inputFields = [
  {
    name: 'name' as const,
    label: 'Address name',
    placeholder: 'Home, Work…',
    icon: Tag,
  },
  {
    name: 'city' as const,
    label: 'City',
    placeholder: 'e.g. Giza',
    icon: Building2,
  },
  {
    name: 'phone' as const,
    label: 'Phone number',
    placeholder: '01xxxxxxxxx',
    icon: Phone,
  },
]

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loadingList, setLoadingList] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)

  const form = useForm<FormValues>({
    defaultValues: { name: '', city: '', phone: '', details: '' },
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

  const loadAddresses = useCallback(async () => {
    try {
      setAddresses(await GetUserAddresses())
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to load addresses'
      )
    } finally {
      setLoadingList(false)
    }
  }, [])

  useEffect(() => {
    loadAddresses()
  }, [loadAddresses])

  const handleAdd = async (values: FormValues) => {
    setSaving(true)
    try {
      const res = await AddAddress(values)
      toast.success(res.message || 'Address added successfully!')
      form.reset()
      setShowForm(false)
      await loadAddresses()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to add address'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = async (id: string) => {
    setRemovingId(id)
    try {
      const res = await RemoveAddress(id)
      toast.success('Address removed successfully!')
      setConfirmId(null)
      await loadAddresses()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to remove address'
      )
    } finally {
      setRemovingId(null)
    }
  }

  return (
    <AccountShell
      active="addresses"
      title="Addresses"
      subtitle="Manage the places you want your orders delivered to."
    >
      {/* Toolbar */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          {loadingList
            ? 'Loading…'
            : `${addresses.length} saved ${
                addresses.length === 1 ? 'address' : 'addresses'
              }`}
        </p>

        <Button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className={`h-11 rounded-xl px-5 text-sm font-semibold transition active:scale-[0.98] ${
            showForm
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:bg-emerald-700'
          }`}
        >
          {showForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add address
            </>
          )}
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <form
          onSubmit={form.handleSubmit(handleAdd)}
          noValidate
          className="mb-8 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 sm:p-6"
        >
          <h2 className="mb-4 text-base font-bold text-gray-900">
            New address
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {inputFields.map(({ name, label, placeholder, icon: Icon }) => (
              <Controller
                key={name}
                name={name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={fieldState.invalid}
                    className={`gap-2 ${name === 'name' ? 'sm:col-span-2' : ''}`}
                  >
                    <label
                      htmlFor={name}
                      className="text-sm font-semibold text-gray-800"
                    >
                      {label}
                    </label>
                    <div className="group relative">
                      <span className="pointer-events-none absolute left-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-white text-gray-500 transition-colors group-focus-within:bg-emerald-100 group-focus-within:text-emerald-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <Input
                        {...field}
                        id={name}
                        type={name === 'phone' ? 'tel' : 'text'}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        className="h-12 rounded-xl border-gray-200 bg-white pl-14 text-sm shadow-sm placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                      />
                    </div>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}

            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="gap-2 sm:col-span-2"
                >
                  <label
                    htmlFor="details"
                    className="text-sm font-semibold text-gray-800"
                  >
                    Address details
                  </label>
                  <textarea
                    {...field}
                    id="details"
                    rows={3}
                    placeholder="Street, building, floor, apartment, landmark…"
                    aria-invalid={fieldState.invalid}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 aria-[invalid=true]:border-red-400"
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-5 flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="h-12 rounded-xl bg-emerald-600 px-8 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save address
                </>
              )}
            </Button>
          </div>
        </form>
      )}

      {/* List */}
      {loadingList ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : addresses.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-200 px-6 py-14 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <MapPin className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-gray-900">
            No addresses yet
          </h3>
          <p className="mt-1 max-w-xs text-sm text-gray-500">
            Add your first delivery address to check out faster next time.
          </p>
          {!showForm && (
            <Button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-5 h-11 rounded-xl bg-emerald-600 px-6 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add address
            </Button>
          )}
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => {
            const isConfirming = confirmId === addr._id
            const isRemoving = removingId === addr._id
            return (
              <li
                key={addr._id}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold text-gray-900">
                      {addr.name}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                      {addr.city}
                    </p>
                  </div>
                </div>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">
                  {addr.details}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                    <Phone className="h-3.5 w-3.5" />
                    {addr.phone}
                  </span>

                  {isConfirming ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setConfirmId(null)}
                        disabled={isRemoving}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100"
                      >
                        Keep
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemove(addr._id)}
                        disabled={isRemoving}
                        className="flex items-center gap-1 rounded-lg bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                      >
                        {isRemoving ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Check className="h-3.5 w-3.5" />
                        )}
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmId(addr._id)}
                      aria-label={`Delete ${addr.name}`}
                      className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </AccountShell>
  )
}