'use server'
import getMyToken from "@/utilities/GetMyToken.utilities"

export async function RemoveProductFromCart(productId: string) {
    const token = await getMyToken()

    if (!token) {
        throw new Error("Login first")
    }

    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
        {
            method: "DELETE",
            headers: {
                 token: String(token),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({productId})
        }
    )

    const payLoad = await response.json()
    return payLoad
}
