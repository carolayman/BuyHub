'use server'
import getMyToken from "@/utilities/GetMyToken.utilities"

export async function getLoggedUserCart() {
    const token = await getMyToken()

    if (!token) {
        throw new Error("Login first")
    }

    const response = await fetch(
        "https://ecommerce.routemisr.com/api/v2/cart",
        {
            method: "GET",
            headers: {
                token: String(token), // || token, // INSTEAD OF token:token
                "Content-Type": "application/json"
            },
            cache: "no-store",
        }
    )

    const payLoad = await response.json()

    return payLoad
}
