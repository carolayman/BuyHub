
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowLeft,
  CircleAlert,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ResetPassword } from '@/api/authActions/auth.resetPassword.action'
import { toast } from 'react-toastify'

const schema = z.object({
    newPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .regex(/[A-Z]/, 'Include at least one uppercase letter')
      .regex(/[a-z]/, 'Include at least one lowercase letter')
      .regex(/[0-9]/, 'Include at least one number')
      .regex(/[^A-Za-z0-9]/, 'Include at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

export default function NewPassword() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')?.trim() ?? ''

  const { register, handleSubmit, formState: { errors },} = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormValues) {
    if (!email) {
      setIsError(true)
      setMessage('Email is missing. Please start the password recovery process again.')
      return
    }

    setLoading(true)
    setMessage('')
    setIsError(false)

    try {
      const response = await ResetPassword({ email,newPassword: values.newPassword})

      if(response.status == "success"){
        setMessage('Your password has been reset successfully.')
        setIsError(false)
        setTimeout(() => {
            router.push('/login')
        }, 200)
        toast.success('Password reset successful! Redirecting to login...')
      }
    } catch (error) {
      setIsError(true)
      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-gray-50/70 px-4 py-3 text-sm text-gray-800 outline-none transition focus:bg-white focus:ring-4 ${
      hasError
        ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
        : 'border-gray-200 focus:border-emerald-600 focus:ring-emerald-100/70'
    }`

  return (
    <main className="relative flex min-h-[calc(100svh-80px)] items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/70 px-4 py-4 sm:px-6">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />

      <div className="relative w-full max-w-xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-3xl border border-gray-100 bg-white px-5 py-5 shadow-[0_20px_70px_-25px_rgba(16,185,129,0.2)] sm:px-10 sm:py-6"
        >
          <div className="mb-4 flex justify-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <LockKeyhole size={26} strokeWidth={1.7} />
              <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white">
                <ShieldCheck size={13} />
              </span>
            </div>
          </div>

          <div className="mb-5 space-y-1.5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-700">
              Account Recovery
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Create new password
            </h1>
            <p className="text-sm leading-5 text-gray-500">
              Choose a strong password to secure your account.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                New Password
              </label>

              <div className="relative">
                <input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  aria-invalid={!!errors.newPassword}
                  {...register('newPassword')}
                  className={`${inputClass(!!errors.newPassword)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-700"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.newPassword && (
                <p className="flex items-center gap-1.5 text-sm text-red-600">
                  <CircleAlert size={15} className="shrink-0" />
                  {errors.newPassword.message}
                </p>
              )}

              <p className="text-xs text-gray-400">
                Use 8+ characters with uppercase, lowercase, a number, and a symbol.
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter your new password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                  className={`${inputClass(!!errors.confirmPassword)} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? 'Hide password' : 'Show password'
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-emerald-700"
                >
                  {showConfirmPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="flex items-center gap-1.5 text-sm text-red-600">
                  <CircleAlert size={15} className="shrink-0" />
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {message && (
            <div
              role="alert"
              className={`mt-4 flex items-start gap-3 rounded-xl border p-3 ${
                isError
                  ? 'border-red-200 bg-red-50'
                  : 'border-emerald-200 bg-emerald-50'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isError
                    ? 'bg-red-100 text-red-600'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {isError ? (
                  <CircleAlert size={18} />
                ) : (
                  <CheckCircle2 size={18} />
                )}
              </div>
              <p
                className={`min-w-0 flex-1 pt-1 text-sm leading-5 ${
                  isError ? 'text-red-700' : 'text-emerald-800'
                }`}
              >
                {message}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Resetting Password...
              </>
            ) : (
              <>
                Reset Password
                <ArrowLeft className="rotate-180" size={17} />
              </>
            )}
          </button>

          <Link
            href="/login"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Back to Login
          </Link>
        </form>

        <p className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck size={14} />
          Your account security matters to us.
        </p>
      </div>
    </main>
  )
}
