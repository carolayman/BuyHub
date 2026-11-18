
"use server"

export async function ForgetPassword({ email }: { email: string }) {
  const response = await fetch(
    'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }
  )

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || 'Failed to send reset instructions.')
  }

  return payload
}
