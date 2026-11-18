
'use server'

import getMyToken from "@/utilities/GetMyToken.utilities"

interface ShippingAddress {
  details: string
  phone: string
  city: string
}

export async function CreateCashOrder(
  cartId: string,
  values: ShippingAddress,
) {
  const token = await getMyToken()

  if (!token) {
    throw new Error("Login first")
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: {
          details: values.details,
          phone: values.phone,
          city: values.city,
        },
      }),
    },
  )

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to create cash order")
  }

  return payload
}
