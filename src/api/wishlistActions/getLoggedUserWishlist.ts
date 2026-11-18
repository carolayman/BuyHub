
"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"

export async function GetLoggedUserWishList() {
  const token = await getMyToken()

  if (!token) {
    return null
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "GET",
      headers: {
        token: String(token),
        "Content-type": "application/json",
      },
      cache: "no-store",
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Failed to get user wishlist")
  }

  return data
}
