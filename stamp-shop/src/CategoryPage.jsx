import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext.jsx';

function CategoryPage({ category, onSelectStamp, onBack }) {
  const [stamps, setStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/stamps/category?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        setStamps(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Navigation & Header */}
        <div className="mb-12">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors mb-6"
          >
            <i className="bi bi-arrow-left"></i> Back to Catalogue
          </button>
          
          <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-6">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              {category}
            </h2>
            <span className="text-slate-400 text-sm font-light">
              {stamps.length} Products Found
            </span>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading Stamps...</p>
          </div>
        ) : stamps.length==0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <i className="bi bi-search text-4xl text-slate-200 mb-4 block"></i>
            <p className="text-slate-500 font-light">No stamps found in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {stamps.map((stamp) => (
              <div
                onClick={()=>onSelectStamp(stamp._id, stamps)}
                key={stamp._id}
                className="group flex flex-col bg-white rounded-2xl transition-all duration-500"
              >
                {/* Stamp Image Container */}
                <div className="relative aspect-[4/5] bg-slate-50 rounded-2xl overflow-hidden mb-4 flex items-center justify-center p-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-200 group-hover:-translate-y-2">
                  <img
                    src={`/uploads/${stamp.image}`}
                    alt={stamp.name}
                    className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Category Badge on Image */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                      {stamp.category}
                    </p>
                  </div>
                </div>

                {/* Stamp Details */}
                <div className="px-2">
                  <h3 className="text-slate-900 font-bold text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {stamp.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-blue-600 font-black text-sm">
                      {parseFloat(stamp.price).toFixed(3)} <span className="text-[10px] ml-0.5">TND</span>
                    </p>
                    <button 
                    onClick={()=>addItem(stamp._id, 1)}
                    className="h-8 w-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                      <i className="bi bi-cart-plus text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;