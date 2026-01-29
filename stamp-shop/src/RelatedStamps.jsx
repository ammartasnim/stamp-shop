import React from 'react'
import { useEffect, useState } from 'react';

function RelatedStamps({ stamp, category, onSelectStamp }) {
    const [relatedStamps, setRelatedStamps] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    if(stamp && category){
      fetch(`/api/stamps/category?category=${encodeURIComponent(category)}`)
      .then((res) => res.json())
      .then((data) => {
        setRelatedStamps(data.filter(s=>s._id!==stamp._id).slice(0,4));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    }
  }, [stamp, category]);
  return (
    <>
    {loading?(
        <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading...</p>
          </div>
    ):(
        <>
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
    </div></>
    )}
    </>
  )
}

export default RelatedStamps