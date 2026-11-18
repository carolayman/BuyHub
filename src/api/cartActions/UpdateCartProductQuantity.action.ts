'use server'
import getMyToken from "@/utilities/GetMyToken.utilities"

export async function UpdateCartProductQuantity(productId: string , count: number) {
    const token = await getMyToken()

    if (!token) {
        throw new Error("Login first")
    }

    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
            method: "PUT",
            headers: {
                 token: String(token),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({count:count})
        }
    )

    const payLoad = await response.json()
    return payLoad
}
