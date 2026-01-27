import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext.jsx';
import toast from 'react-hot-toast';

function StampPage({ stampId, onSelectStamp, onBacktoCategory, role, onBack, query }) {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const [stamp, setStamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedStamps, setRelatedStamps]=useState([]);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const { addItem } = useCart();

  const fetchStamp=async()=>{
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
    if(stamp){
      fetch(`/api/stamps/category?category=${encodeURIComponent(stamp.category)}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedStamps(data.filter(s=>s._id!==stampId)).slice(0,4);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [stampId, stamp?.category]);


  const onArchive = async (stampId) => {
    const confirmed = window.confirm(
      "Are you sure you want to archive this stamp?"
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/stamps/${stampId}`, {
        method: 'PATCH',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        toast.success("The stamp has been archived.");
        fetchStamp();
      }
      else {
        const data = await res.json();
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while archiving the stamp. Please try again later.");
    }
  }
  const onUnarchive = async (stampId) => {
    try {
      const res = await fetch(`/api/stamps/unarchive/${stampId}`, {
        method: 'PATCH',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        toast.success("The stamp has been restored.");
        fetchStamp();
      }
      else {
        const data = await res.json();
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while restoring the stamp. Please try again later.");
    }
  }
  const onDelete = async (stampId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stamp? This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/stamps/delete/${stampId}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        toast.success("The stamp has been deleted.");
        onBacktoCategory();
      }
      else {
        const data = await res.json();
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the stamp. Please try again later.");
    }
  }

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
              onClick={query?()=>onBack():()=>onBacktoCategory()}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all"
            >
              <i className="bi bi-arrow-left text-lg group-hover:-translate-x-1 transition-transform"></i> 
            {query? "Back to Catalogue":"Back to Category"}
            </button>

            {role === 'admin' && (
              <div className="relative">
                <button
                  onClick={() => setShowAdminMenu(!showAdminMenu)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
                >
                  <i className="bi bi-three-dots"></i>
                </button>

                {showAdminMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 shadow-2xl rounded-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
                    {stamp.isArchived ? (
                      <button onClick={()=>onUnarchive(stamp._id)}
                       className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                    >
                      <i className="bi bi-archive text-slate-400"></i> Unarchive Stamp
                    </button>
                    ):(
                      <button onClick={()=>onArchive(stamp._id)}
                      className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-3"
                    >
                      <i className="bi bi-archive text-slate-400"></i> Archive Stamp
                    </button>
                    )}
                    <button
                     onClick={()=>onDelete(stamp._id)}
                     className="w-full text-left px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-3"
                    >
                      <i className="bi bi-trash text-slate-400"></i> Delete Permanently
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Main Product Section */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 items-center mb-24">
            
            {/* Left Column: Image */}
            <div className="w-full md:w-1/2">
              <div className="bg-[#FBFBFC] rounded-[2.5rem] aspect-square flex items-center justify-center shadow-[inset_0_2px_15px_rgba(0,0,0,0.01)] border border-slate-50">
                <img
                  src={`/uploads/${stamp.image}`}
                  alt={stamp.name}
                  className="max-h-full max-w-full rounded-[0.5rem] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform duration-1000 ease-out"
                />
              </div>
            </div>

            {/* Right Column: Content */}
            <div className="w-full md:w-1/2 space-y-10">
              <div className="space-y-4">
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] block">
                  {stamp.category}
                </span>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {stamp.name}
                </h1>
                <div className="pt-4">
                   <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">
                      {parseFloat(stamp.price).toFixed(3)}
                    </span>
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">TND</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-2 font-medium tracking-wide">Standard Issue</p>
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-3">
                <button 
                onClick={()=>addItem(stamp._id, 1)}
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-[0.98]">
                  Add to Cart
                </button>
                <button className="w-full py-4 border border-slate-200 text-slate-900 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-[0.98]">
                  Buy Now
                </button>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-center gap-6 opacity-40 grayscale">
                <i className="bi bi-shield-check text-xl"></i>
                <i className="bi bi-truck text-xl"></i>
                <i className="bi bi-credit-card text-xl"></i>
              </div>
            </div>
          </div>

          {/* Related Items Section */}
          <div className="border-t border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">
                Stamps in the same category
              </h2>
              <div className="h-[1px] flex-grow bg-slate-100 ml-6"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {relatedStamps.map((stp) => (
                <div key={stp._id} className="group cursor-pointer" onClick={()=>onSelectStamp(stp._id)}>
                  <div className="bg-[#FBFBFC] rounded-3xl aspect-[4/3] flex items-center justify-center mb-4 overflow-hidden border border-slate-50 transition-all group-hover:border-slate-200 group-hover:shadow-lg group-hover:shadow-slate-100">
                    <img 
                      src={`/uploads/${stp.image}`} 
                      alt={stp.name} 
                      className="w-1/2 object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 mb-1">{stp.name}</h3>
                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{stp.price} TND</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default StampPage;