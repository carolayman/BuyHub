
"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"

export async function GetSpecificAddress(addressId: string) {
  const token = await getMyToken()

  if (!token) {
    throw new Error("You must be logged in")
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "GET",
      headers: {
        token: String(token),
      },
      cache: "no-store",
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Failed to get address")
  }

  return data
}
