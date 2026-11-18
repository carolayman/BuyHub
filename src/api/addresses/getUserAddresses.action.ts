"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"

export type Address = {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}

export async function GetUserAddresses(): Promise<Address[]> {
  const token = await getMyToken()

  if (!token) {
    throw new Error("You must be logged in")
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "GET",
      headers: { token: String(token) },
      cache: "no-store",
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Failed to load addresses")
  }

  return Array.isArray(data.data) ? data.data : []
}