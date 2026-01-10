import React from 'react'
import { Link } from 'react-router-dom'

function Cart() {
  return (
    <div className="cart-dropdown">
      <h6 className="mb-2">Your cart</h6>
      <p className="text-muted mb-2">Your cart is empty.</p>
      <Link to="/catalogue" className="btn btn-dark btn-sm w-100">
        Browse products
      </Link>
    </div>
  )
}

export default Cart