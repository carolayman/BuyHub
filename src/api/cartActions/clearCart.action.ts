'use server'
import getMyToken from "@/utilities/GetMyToken.utilities"

export async function ClearUserCart() {
    const token = await getMyToken()

    if (!token) {
        throw new Error("Login first")
    }

    const response = await fetch(
        `https://ecommerce.routemisr.com/api/v2/cart`,
        {
            method: "DELETE",
            headers: {
                 token: String(token),
                "Content-Type": "application/json"
            },
        }
    )

    const payLoad = await response.json()
    return payLoad
}
