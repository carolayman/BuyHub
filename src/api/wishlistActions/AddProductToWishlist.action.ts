"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"

export async function addProductToWishList({id} :{id:string}){

    const token = await getMyToken()
    if (!token){
        throw new Error ('Login First')
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist` ,
        {
            method:"POST",
            headers:{
                token: String(token),
                "Content-type":"application/json"

            },
            body : JSON.stringify({productId : id})
        }
    )

    const payload = await response.json()

    if (!response.ok) {
        throw new Error(payload.message || 'Failed to add product to wishlist')
    }

return payload
}