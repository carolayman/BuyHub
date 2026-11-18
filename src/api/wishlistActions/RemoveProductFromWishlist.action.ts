"use server"

import getMyToken from "@/utilities/GetMyToken.utilities"

export async function RemoveProductFromWishList({id} :{id:string}){

    const token = await getMyToken()
    if (!token){
        throw new Error ('Login First')
    }

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,
        {
            method:"DELETE",
            headers:{
                token: String(token),
                "Content-type":"application/json"

            },

        }
    )

    const payload = await response.json()

    if (!response.ok) {
        throw new Error(payload.message || 'Failed to remove product from wishlist')
    }

    return payload
}