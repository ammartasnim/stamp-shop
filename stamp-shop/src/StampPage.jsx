import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext.jsx';
import RelatedStamps from './RelatedStamps.jsx';
import { useNavigate } from 'react-router-dom';

function StampPage({ stampId, onSelectStamp, onBacktoCategory, role, onBack, query }) {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [stamp, setStamp] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();

  const fetchStamp = async () => {
    setLoading(true);
    fetch(`/api/stamps/${stampId}`)
      .then((res) => res.json())
      .then((data) => {
        setStamp(data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchStamp();
  }, [stampId]);

  const navigate = useNavigate();
  const buyNow = (stock, id, price) => {
    const existing = cart.find(item => item.productId?._id === id);
    const currentQuantity = existing ? existing.quantity : 0;
    if (currentQuantity >= 5) {
      toast.error("Maximum quantity (5) already in cart");
      return;
    }
    if (stock <= 0) {
      toast.error("This item is out of stock");
      return;
    }
    addItem(id, 1, price);
    navigate('/checkout');
  }

  // Helper to format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-6">
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-slate-300">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-[10px] uppercase font-bold tracking-[0.3em]">Loading Stamp...</p>
        </div>
      ) : (
        <div className="max-w-[1000px] mx-auto">

          {/* Top Bar */}
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={query ? () => onBack() : () => onBacktoCategory()}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all"
            >
              <i className="bi bi-arrow-left text-lg group-hover:-translate-x-1 transition-transform"></i>
              {query ? "Back to Catalogue" : "Back to Category"}
            </button>

          </div>

          {/* Main Product Section */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start mb-24">

            {/* Left Column: Image */}
            <div className="w-full md:w-1/2 sticky top-10">
              <div className="bg-white rounded-[2.5rem] aspect-square flex items-center justify-center shadow-sm border border-slate-100">
                <img
                  src={`/uploads/${stamp.image}`}
                  alt={stamp.name}
                  className="max-h-[80%] max-w-[80%] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-1/2 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em]">
                    {stamp.category}
                  </span>
                  {/* Stock Badge */}
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${stamp.stock > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                    {stamp.stock > 0 ? `In Stock: ${stamp.stock}` : 'Out of Stock'}
                  </span>
                </div>

                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {stamp.name}
                </h1>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    {parseFloat(stamp.price).toFixed(3)}
                  </span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">TND</span>
                </div>
              </div>

              <div>
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Issue Date</h4>
                <p className="text-xs leading-relaxed text-slate-800">{formatDate(stamp.issueDate)}</p>
              </div>
              {/* Description Section */}
              {stamp.description && (
                <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    About this stamp
                  </h3>

                  <p className="text-slate-800 text-sm leading-relaxed max-w-prose whitespace-pre-line">
                    {stamp.description}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  disabled={stamp.stock <= 0}
                  onClick={() => addItem(stamp._id, 1, stamp.price)}
                  className={`w-full py-4 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200 active:scale-[0.98] ${stamp.stock > 0
                      ? 'bg-slate-900 text-white hover:bg-blue-600'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    }`}>
                  {stamp.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  disabled={stamp.stock <= 0}
                  onClick={()=>buyNow(stamp.stock, stamp._id, stamp.price)}
                  className="w-full py-4 border border-slate-200 text-slate-900 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-[0.98] disabled:opacity-50">
                  Buy Now
                </button>
              </div>

              <div className="pt-4 flex items-center justify-center gap-6 opacity-40 grayscale">
                <i className="bi bi-shield-check text-xl"></i>
                <i className="bi bi-truck text-xl"></i>
                <i className="bi bi-credit-card text-xl"></i>
              </div>
            </div>
          </div>

          {/* Related Items Section */}
          <div className="border-t border-slate-100 pt-16">
            <RelatedStamps stamp={stamp} category={stamp.category} onSelectStamp={onSelectStamp} />
          </div>

        </div>
      )}
    </div>
  );
}

export default StampPage;