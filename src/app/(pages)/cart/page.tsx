import CartProducts from '@/app/_components/cartProducts/cartProducts'
import { getLoggedUserCart } from '@/api/cartActions/getLoggedUserCart.action'
import React from 'react'

export default async function Cart() {
  const response = await getLoggedUserCart()
  return (
    <>      
      <CartProducts cart={response} />
    </>
  )
}
