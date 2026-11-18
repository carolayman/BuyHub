
'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, ArrowLeft, CircleAlert, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { ForgetPassword } from '@/api/authActions/auth.forgetPassword'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .pipe(z.email({ message: 'Invalid email address' })),
})

type FormValues = z.infer<typeof schema>

export default function ForgetPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    setMessage('')
    setIsError(false)

    try {
      const response = await ForgetPassword({ email: values.email })
      if (response.statusMsg == "success") {
        router.push(
          `/verify-code?email=${encodeURIComponent(values.email)}`
        )
      } else {
        setIsError(true)
        setMessage(response.message || 'Failed to send reset instructions.')
      }
    } catch {
    setIsError(true)
    setMessage(
        'We couldn’t find your account. Please check your email address and try again.'
    )
    } finally {
    setLoading(false)
    }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="px-4 pt-10 sm:pt-14">
        <div className="mx-auto w-full max-w-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm sm:p-10"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Mail size={26} strokeWidth={1.8} />
            </div>

            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Forgot Password?
              </h1>
              <p className="text-sm leading-6 text-gray-500">
                Enter your email address to reset your password.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                {...register('email')}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />

              {errors.email && (
                <p className="flex items-center gap-1.5 text-sm text-red-600">
                  <CircleAlert size={15} className="shrink-0" />
                  {errors.email.message}
                </p>
              )}
            </div>

            {message && (
              <div
                role="alert"
                className={`flex items-start gap-3 rounded-xl border p-4 ${
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
                    <CheckCircle size={18} />
                  )}
                </div>

                <div className="min-w-0 flex-1 pt-1">
                  <p
                    className={`text-sm font-semibold ${
                      isError ? 'text-red-800' : 'text-emerald-800'
                    }`}
                  >
                    {isError ? 'Something went wrong' : 'Request successful'}
                  </p>
                  <p
                    className={`mt-1 break-words text-sm leading-5 ${
                      isError ? 'text-red-700' : 'text-emerald-700'
                    }`}
                  >
                    {message}
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </button>

            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-gray-500 transition hover:text-emerald-700"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </form>
            <p className="mt-6 text-center text-xs leading-5 text-gray-400">
                Your account security matters to us.
            </p>
        </div>
      </div>
    </main>
  )
}
