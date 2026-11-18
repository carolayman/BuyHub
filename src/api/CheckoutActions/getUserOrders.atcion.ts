
'use server'

import getMyToken from "@/utilities/GetMyToken.utilities"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
  id: string
}

export async function GetUserOrder() {
  const token = await getMyToken()

  if (!token) {
    throw new Error("User token not found")
  }

  const decodedToken = jwtDecode<DecodedToken>(token)
  const id = decodedToken.id

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
  )

  const payload = await response.json()
  return payload
}
