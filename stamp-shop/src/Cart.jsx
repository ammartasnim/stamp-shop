import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from './CartContext.jsx'

function Cart() {
  const { cart, removeItem, clearCart, loading, updateQuantity } = useCart();
  
  // Calculate total
  const total = cart.reduce((sum, item) => 
    sum + (item.productId.price * item.quantity), 0
  );

  const decreaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity - 1);
  };
  const increaseQuantity = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  }

  const onClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="flex flex-col gap-3 bg-white rounded-lg shadow-sm border border-slate-100 p-4 m-0" onClick={onClick} >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <i className="bi bi-cart3 text-slate-700 text-lg"></i>
          <h6 className="text-slate-900 font-bold text-base">Your Cart</h6>
        </div>
        {cart.length > 0 && (
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
            {cart.length}
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-300">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
          <p className="text-xs uppercase font-bold tracking-widest text-slate-400">Loading...</p>
        </div>
      ) : cart.length === 0 ? (
        <div className="flex flex-col items-center text-center py-8">
          <div className="bg-slate-50 rounded-full p-4 mb-3">
            <i className="bi bi-box-seam text-slate-300" style={{fontSize: '32px'}}></i>
          </div>
          <h3 className="text-slate-900 font-semibold text-sm mb-1">Cart is empty</h3>
          <p className="text-slate-500 text-xs leading-relaxed mb-4 max-w-xs">
            Add stamps to your cart
          </p>
          <Link 
            to="/catalogue"
            className="no-underline inline-flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md text-xs font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm active:scale-[0.98]"
          >
            <i className="bi bi-cart3"></i>
            Browse
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Cart Items */}
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div 
                key={item.productId._id} 
                className="flex items-center gap-2 p-2 rounded-md border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all duration-200"
              >
                {/* Product Image */}
                <div className="w-12 h-12 bg-slate-50 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img 
                    src={`/uploads/${item.productId.image}`} 
                    alt={item.productId.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-slate-900 font-semibold text-xs truncate">
                    {item.productId.name}
                  </h4>
                  <span className="text-slate-500 text-xs">
                    {parseFloat(item.productId.price).toFixed(3)} TND
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-1 bg-slate-50 rounded px-1 py-0.5">
                  <button
                    onClick={() => decreaseQuantity(item.productId._id, item.quantity)}
                    className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-all"
                    aria-label="Decrease quantity"
                  >
                    <i className="bi bi-dash text-sm"></i>
                  </button>
                  <span className="text-xs font-bold text-slate-900 min-w-[20px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(item.productId._id, item.quantity)}
                    className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded transition-all"
                    aria-label="Increase quantity"
                  >
                    <i className="bi bi-plus text-sm"></i>
                  </button>
                </div>

                {/* Price */}
                <div className="text-right min-w-[60px]">
                  <p className="text-slate-900 font-bold text-xs">
                    {(parseFloat(item.productId.price) * item.quantity).toFixed(3)}
                  </p>
                  <p className="text-slate-400 text-xs">TND</p>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeItem(item.productId._id)} 
                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-all duration-200"
                  aria-label="Remove item"
                >
                  <i className="bi bi-trash3 text-sm"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-slate-600 font-medium text-xs">Subtotal</span>
              <span className="text-slate-900 font-bold text-base">
                {total.toFixed(3)} TND
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <Link
                to="/checkout"
                className="no-underline w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md text-xs font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm active:scale-[0.98]"
              >
                Checkout
              </Link>
              <button 
                onClick={clearCart} 
                className="w-full flex items-center justify-center gap-2 bg-white text-red-600 border border-red-200 py-2 px-4 rounded-md text-xs font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-300 active:scale-[0.98]"
              >
                <i className="bi bi-trash3"></i>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart