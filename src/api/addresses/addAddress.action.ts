"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"

export async function AddAddress(values: {
  name: string
  details: string
  phone: string
  city: string
}) {
  const token = await getMyToken()

  if (!token) {
    throw new Error("You must be logged in")
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "POST",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Failed to add address")
  }

  return data
}