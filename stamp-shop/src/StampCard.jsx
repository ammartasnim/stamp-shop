import React from 'react';
import { useCart } from './CartContext.jsx';
import toast from 'react-hot-toast';

function StampCard({ stamp, onSelectStamp }) {
  const { cart, addItem } = useCart();
  
  const existing = cart.find(item => item.productId?._id === stamp._id);
  const isMaxed = existing?.quantity >= 5;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (isMaxed) {
      toast.error("Maximum quantity reached for this stamp.");
      return;
    }
    addItem(stamp._id, 1, stamp.price);
  };

  return (
    <div
      onClick={() => onSelectStamp(stamp._id)}
      className="group flex flex-col bg-white rounded-2xl transition-all duration-500 cursor-pointer"
    >
      <div className="relative aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-200 group-hover:-translate-y-2">
        <img
          src={`/uploads/${stamp.image}`}
          alt={stamp.name}
          className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
          <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
            {stamp.category}
          </p>
        </div>
      </div>

      <div className="px-2">
        <h3 className="text-slate-900 font-bold text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {stamp.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-blue-600 font-black text-sm">
            {parseFloat(stamp.price).toFixed(3)} <span className="text-[10px] ml-0.5">TND</span>
          </p>
          <button
            disabled={stamp.stock <= 0 || isMaxed}
            onClick={handleAddToCart}
            className={`h-8 w-8 rounded-full flex items-center justify-center transition-all
              ${isMaxed
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'border border-slate-100 text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600'}
            `}
          >
            <i className="bi bi-cart-plus text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StampCard;