'use server'

type ResetPasswordData = {
  email: string
  newPassword: string
}

export async function ResetPassword(values: ResetPasswordData) {
  const response = await fetch(
    'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      cache: 'no-store',
    }
  )

  const responseText = await response.text()
  let data: { message?: string } = {}

  if (responseText) {
    try {
      data = JSON.parse(responseText)
    } catch {
      data = {}
    }
  }

  if (!response.ok) {
    throw new Error(data.message || 'Failed to reset password. Please try again.')
  }

  return { status: 'success', message: 'Password reset successfully.' }
}
