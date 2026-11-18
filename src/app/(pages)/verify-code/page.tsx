'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  KeyRound,
  ArrowLeft,
  CircleAlert,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { VerifyResetCode } from '@/api/authActions/auth.verifyCode.action'

const schema = z.object({
  resetCode: z
    .string()
    .min(1, { message: 'Verification code is required' })
    .length(6, { message: 'Code must be 6 digits' })
    .regex(/^\d{6}$/, { message: 'Enter a valid 6-digit code' }),
})

type FormValues = z.infer<typeof schema>

export default function ResetPassword() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email')

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
      const response = await VerifyResetCode({
        resetCode: values.resetCode,
      })

      if (response.status === 'Success') {
        router.push(
          `/reset-password${email ? `?email=${encodeURIComponent(email)}` : ''}`
        )
      } else {
        setIsError(true)
        setMessage(response.message || 'Invalid verification code. Please try again.')
      }
    } catch (error) {
      setIsError(true)
      setMessage(
        error instanceof Error
          ? error.message
          : 'Please check your code and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

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
            <div className="relative flex h-18 w-18 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <KeyRound size={40} strokeWidth={1.7} />
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
              Verify your code
            </h1>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="resetCode"
              className="block text-sm font-semibold text-gray-700"
            >
              Verification Code
            </label>

            <input
              id="resetCode"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="Enter 6-digit code"
              aria-invalid={!!errors.resetCode}
              {...register('resetCode')}
              className={`w-full rounded-xl border bg-gray-50/70 px-4 py-3 text-center text-lg font-semibold tracking-[0.3em] outline-none transition placeholder:tracking-normal placeholder:font-normal placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                errors.resetCode
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                  : 'border-gray-200 focus:border-emerald-600 focus:ring-emerald-100/70'
              }`}
            />

            {errors.resetCode && (
              <p className="flex items-center gap-1.5 text-sm text-red-600">
                <CircleAlert size={15} className="shrink-0" />
                {errors.resetCode.message}
              </p>
            )}

            <p className="pt-0.5 text-xs text-gray-400">
              Enter all 6 digits from the email you received.
            </p>
          </div>

          {message && (
            <div
              role="alert"
              className={`mt-3 flex items-start gap-3 rounded-xl border p-3 ${
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

              <div className="min-w-0 flex-1 pt-1">
                <p
                  className={`text-sm font-semibold ${
                    isError ? 'text-red-800' : 'text-emerald-800'
                  }`}
                >
                  {isError ? 'Verification failed' : 'Verification successful'}
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
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-700/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-emerald-700/25 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Verifying code...
              </>
            ) : (
              <>
                Verify Code
                <ArrowLeft className="rotate-180" size={17} />
              </>
            )}
          </button>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs text-gray-400">Need another code?</span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <Link
            href={`/forget-password${email ? `?email=${encodeURIComponent(email)}` : ''}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
          >
            <ArrowLeft size={16} />
            Resend Code
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
