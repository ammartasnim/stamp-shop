import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext.jsx';

export function NewArrivals() {
  const [stamps, setStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();
  const Navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('/api/stamps')
      .then(res => res.json())
      .then(data => {
        setStamps(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

    const onSelectStamp = (stampId) => {
  const query = " ";
  Navigate(`/catalogue?query=${query}&stampId=${stampId}`);
};
    const onAddToCart = (e,stampId) => {
      e.stopPropagation();
      addItem(stampId, 1);
    }
  

  return (
    <section className="bg-slate-50 py-10"> {/* Reduced section padding */}
      <div className="max-w-6xl mx-auto px-6"> {/* Slightly narrower container */}
        
        {/* Compact Header */}
        <div className="text-center mb-10 space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            New Arrivals
          </h2>
          <p className="text-slate-400 font-medium text-xs uppercase tracking-widest">
            Latest Philatelic Releases
          </p>
        </div>

        {/* Tightened Grid (gap-5 instead of gap-8) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-slate-300">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-[10px] uppercase font-bold tracking-widest">Syncing...</p>
            </div>
          ) : (
            stamps.map((stamp) => (
              <div 
              onClick={() => onSelectStamp(stamp._id)}
                key={stamp.id || stamp._id} 
                className="group flex flex-col bg-white border border-slate-100 rounded-[1.5rem] p-3.5 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500"
              >
                {/* Image Container - Compact Margin */}
                <div className="relative aspect-square w-full bg-[#F8FAFC] rounded-xl overflow-hidden mb-3.5 flex items-center justify-center p-4 border border-slate-50">
                  <img 
                    src={`/uploads/${stamp.image}`}
                    alt={stamp.name}
                    className="max-w-full max-h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-tighter text-blue-600 shadow-sm border border-slate-100">
                    New Issue
                  </div>
                </div>

                {/* Info Section - Smaller text & tighter spacing */}
                <div className="px-1 mb-4 flex-grow">
                  <h3 className="font-bold text-slate-800 text-[13px] leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {stamp.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <p className="text-blue-600 font-black text-sm">
                      {Number(stamp.price).toFixed(3)}
                    </p>
                    <span className="text-[8px] font-bold text-slate-400 uppercase">TND</span>
                  </div>
                </div>

                {/* Compact Button */}
                <button 
                onClick={(e)=>onAddToCart(e, stamp._id)}
                className="w-full bg-slate-900 text-white py-3 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:bg-blue-600 active:scale-[0.95] flex items-center justify-center gap-2">
                  Add <i className="bi bi-cart-plus text-xs"></i>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;