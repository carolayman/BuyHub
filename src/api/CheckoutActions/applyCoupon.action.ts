
"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"

export async function ApplyCouponToCart(couponName: string) {
  const token = await getMyToken()

  if (!token) {
    throw new Error("Login first")
  }

  if (!couponName.trim()) {
    throw new Error("Please enter a coupon code")
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v2/cart/applyCoupon",
    {
      method: "PUT",
      headers: {
        token: String(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        couponName: couponName.trim(),
      }),
    },
  )

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to apply coupon")
  }

  return payload
}
