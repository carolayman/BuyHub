'use server'
import getMyToken from "@/utilities/GetMyToken.utilities"

export async function AddProductToCart(productId: string) {
    const token = await getMyToken()

    if (!token) {
        throw new Error("Login first")
    }

    const response = await fetch(
        "https://ecommerce.routemisr.com/api/v2/cart",
        {
            method: "POST",
            headers: {
                token: String(token),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({productId})
        }
    )

    const payLoad = await response.json()

    if (!response.ok) {
        throw new Error(payLoad.message || "Failed to add product to cart")
    }

    console.log("AddProductToCart response:", payLoad) // Log the response for debugging
    return payLoad
}
