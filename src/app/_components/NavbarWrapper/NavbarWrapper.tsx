import React from 'react'
import Navbar from '../navbar/navbar'
import CartIcon from '../cartIcon/CartIcon'
import WishlistIcon from '../WishlistIcon/WishlistIcon'

export default function NavbarWrapper() {
  return (
    <>
      <Navbar  cartIcon={<CartIcon />}  wishlistIcon={<WishlistIcon />}/>
    </>
  )
}
