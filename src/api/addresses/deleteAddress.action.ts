
"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"

export async function RemoveAddress(addressId: string) {
  const token = await getMyToken()

  if (!token) {
    throw new Error("You must be logged in")
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token: String(token),
      },
    }
  )

  if (!response.ok) {
    const data = await response.json().catch(() => null)
    throw new Error(data?.message || "Failed to remove address")
  }

  return true
}
