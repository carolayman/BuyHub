
"use server"

export async function VerifyResetCode ({ resetCode }: { resetCode: string }) {
  const response = await fetch(
    'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resetCode }),
    }
  )

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.message || 'Failed to verify code.')
  }

  return payload
}
