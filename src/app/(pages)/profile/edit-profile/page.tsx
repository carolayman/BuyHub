
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'react-toastify'
import {
  UserRound,
  Mail,
  Phone,
  Save,
  Loader2,
  RotateCcw,
} from 'lucide-react'
import { UpdateLoggedUserData } from '@/api/profile/updateLoggedUserData.action'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AccountShell from '@/app/_components/AccountShell/AccountShell'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
})

type FormValues = z.infer<typeof schema>

const fields = [
  {
    name: 'name' as const,
    label: 'Full name',
    placeholder: 'Enter your full name',
    icon: UserRound,
    type: 'text',
    autoComplete: 'name',
  },
  {
    name: 'email' as const,
    label: 'Email address',
    placeholder: 'you@example.com',
    icon: Mail,
    type: 'email',
    autoComplete: 'email',
  },
  {
    name: 'phone' as const,
    label: 'Phone number',
    placeholder: '01xxxxxxxxx',
    icon: Phone,
    type: 'tel',
    autoComplete: 'tel',
  },
]

export default function EditProfilePage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
    resolver: zodResolver(schema),
    mode: 'onTouched',
  })

  const handleUpdate = async (values: FormValues) => {
    setIsLoading(true)

    try {
      const response = await UpdateLoggedUserData(values)

      toast.success(response.message || 'Profile updated successfully!')
      form.reset(values)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update profile. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AccountShell
      active="profile"
      title="Personal information"
      subtitle="Manage your personal details and contact information."
    >
      <form onSubmit={form.handleSubmit(handleUpdate)} noValidate>
        <div className="grid gap-5">
          {fields.map(
            ({ name, label, placeholder, icon: Icon, type, autoComplete }) => (
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
                        type={type}
                        autoComplete={autoComplete}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        className="h-12 rounded-xl border-gray-200 bg-white pl-14 text-sm text-gray-900 shadow-sm transition placeholder:text-gray-400 focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                      />
                    </div>

                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            )
          )}
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading || !form.formState.isDirty}
            onClick={() => form.reset()}
            className="h-12 rounded-xl border-gray-200 px-5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>

          <Button
            type="submit"
            disabled={isLoading || !form.formState.isDirty}
            className="h-12 rounded-xl bg-emerald-600 px-8 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save changes
              </>
            )}
          </Button>
        </div>
      </form>
    </AccountShell>
  )
}
