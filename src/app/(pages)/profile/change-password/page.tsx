
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-toastify'
import {
  LockKeyhole,
  KeyRound,
  Eye,
  EyeOff,
  Check,
  Loader2,
  Save,
} from 'lucide-react'
import { UpdateLoggedUserPassword } from '@/api/profile/updateLoggedUserPassword.action'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AccountShell from '@/app/_components/AccountShell/AccountShell'

const schema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rePassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((values) => values.password === values.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
  })

type FormValues = z.infer<typeof schema>

const fields = [
  {
    name: 'currentPassword' as const,
    label: 'Current password',
    placeholder: 'Enter your current password',
    icon: LockKeyhole,
    autoComplete: 'current-password',
  },
  {
    name: 'password' as const,
    label: 'New password',
    placeholder: 'At least 6 characters',
    icon: KeyRound,
    autoComplete: 'new-password',
  },
  {
    name: 'rePassword' as const,
    label: 'Confirm new password',
    placeholder: 'Repeat the new password',
    icon: KeyRound,
    autoComplete: 'new-password',
  },
]

function getRules(pw: string) {
  return [
    { label: 'At least 6 characters', ok: pw.length >= 6 },
    { label: 'An uppercase letter', ok: /[A-Z]/.test(pw) },
    { label: 'A number', ok: /\d/.test(pw) },
    { label: 'A symbol (!@#$…)', ok: /[^A-Za-z0-9]/.test(pw) },
  ]
}

const strengthMeta = [
  { label: 'Too short', bar: 'bg-gray-200', text: 'text-gray-400' },
  { label: 'Weak', bar: 'bg-red-500', text: 'text-red-600' },
  { label: 'Fair', bar: 'bg-amber-500', text: 'text-amber-600' },
  { label: 'Good', bar: 'bg-lime-500', text: 'text-lime-600' },
  { label: 'Strong', bar: 'bg-emerald-600', text: 'text-emerald-700' },
]

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [visible, setVisible] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues: {
      currentPassword: '',
      password: '',
      rePassword: '',
    },
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

  const newPassword = form.watch('password')
  const rules = getRules(newPassword)
  const score = newPassword ? rules.filter((r) => r.ok).length : 0
  const meta = strengthMeta[score]

  const handleUpdate = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const response = await UpdateLoggedUserPassword(values)

      toast.success(response.message || 'Password updated successfully!')
      form.reset()
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update password. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AccountShell
      active="password"
      title="Password"
      subtitle="Choose a strong password you don't use anywhere else."
    >
      <form onSubmit={form.handleSubmit(handleUpdate)} noValidate>
        <div className="grid gap-5">
          {fields.map(
            ({ name, label, placeholder, icon: Icon, autoComplete }) => (
              <Controller
                key={name}
                name={name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-2">
                    <label
                      htmlFor={name}
                      className="text-sm font-semibold text-gray-800"
                    >
                      {label}
                    </label>

                    <div className="group relative">
                      <span className="pointer-events-none absolute left-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-focus-within:bg-emerald-100 group-focus-within:text-emerald-700">
                        <Icon className="h-4 w-4" />
                      </span>

                      <Input
                        {...field}
                        id={name}
                        type={visible[name] ? 'text' : 'password'}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        className="h-12 rounded-xl border-gray-200 bg-white pl-14 pr-12 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setVisible((v) => ({
                            ...v,
                            [name]: !v[name],
                          }))
                        }
                        aria-label={
                          visible[name] ? 'Hide password' : 'Show password'
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition hover:text-emerald-700"
                      >
                        {visible[name] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}

                    {name === 'password' && (
                      <div className="mt-1 rounded-xl bg-gray-50 p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-1 gap-1.5">
                            {[1, 2, 3, 4].map((i) => (
                              <span
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-colors ${
                                  i <= score ? meta.bar : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span
                            className={`w-16 text-right text-xs font-semibold ${meta.text}`}
                          >
                            {meta.label}
                          </span>
                        </div>

                        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {rules.map((r) => (
                            <li
                              key={r.label}
                              className={`flex items-center gap-2 text-xs transition-colors ${
                                r.ok ? 'text-emerald-700' : 'text-gray-400'
                              }`}
                            >
                              <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                                  r.ok
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-gray-200'
                                }`}
                              >
                                {r.ok && <Check className="h-2.5 w-2.5" />}
                              </span>
                              {r.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Field>
                )}
              />
            )
          )}
        </div>

        <div className="mt-8 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            disabled={isLoading || !form.formState.isDirty}
            onClick={() => {
              form.reset()
              setVisible({})
            }}
            className="h-12 rounded-xl px-5 text-sm font-semibold text-gray-500 hover:text-gray-900"
          >
            Clear
          </Button>

          <Button
            type="submit"
            disabled={isLoading || !form.formState.isDirty}
            className="h-12 rounded-xl bg-emerald-600 px-8 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Update password
              </>
            )}
          </Button>
        </div>
      </form>
    </AccountShell>
  )
}
