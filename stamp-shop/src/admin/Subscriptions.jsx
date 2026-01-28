import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch("/api/subscriptions", {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then((res) => res.json())
      .then((data) => {
        setSubscriptions(data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [token]);

  const onCancel = async (id) => {
    const confirmed = window.confirm("Are you sure you want to cancel this subscription?");
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        setSubscriptions(subscriptions.map(sub => sub._id === id ? { ...sub, active: false } : sub));
      }
    } catch (err) { console.error(err); }
  };

  const onDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this subscription?");
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        setSubscriptions(subscriptions.filter(sub => sub._id !== id));
      }
    } catch (err) { console.error(err); }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Subscriptions</h2>
          <p className="text-slate-500 text-sm mt-1">Monitor recurring orders and user deposit tiers.</p>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading...</p>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200 mx-6 my-6">
            <p className="text-slate-500">No subscriptions found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse table-auto">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="pl-8 pr-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/5">Subscriber</th>
                  <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan & Fund</th>
                  <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-1/4">Categories</th>
                  <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                  <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined</th>
                  <th className="pl-4 pr-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subscriptions.map((sub) => (
                  <tr key={sub._id} className="hover:bg-slate-50/ transition-colors">
                    <td className="pl-8 pr-4 py-4">
                      <div className="font-bold text-slate-900 text-sm whitespace-nowrap">
                        {sub.userId?.firstname} {sub.userId?.lastname}
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">
                        {sub.userId?.email}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex flex-col whitespace-nowrap">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Balance:</span>
                          <span className={`text-[11px] font-black ${sub.fund < 20 ? 'text-red-500' : 'text-emerald-600'}`}>
                            {Number(sub.fund).toFixed(3)} TND
                          </span>
                        <span className="text-[11px] font-black text-blue-600 uppercase">
                          {sub.type} TND <span className="text-slate-300 mx-1">/</span> {sub.frequency}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium opacity-70">
                          {sub.mode.replaceAll('_', ' ')+' TND'}
                        </span>
                      </div>
                    </td>


                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {sub.products?.map((category, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[9px] font-bold border border-blue-100/50 whitespace-nowrap">
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${sub.active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                        {sub.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
                        {sub.createdAt ? format(new Date(sub.createdAt), 'dd MMM yyyy') : 'N/A'}
                      </span>
                    </td>

                    <td className="pl-4 pr-8 py-4 text-right">
                      {sub.active ? (
                        <div className="flex justify-end">
                        <button
                        onClick={() => onCancel(sub._id)}
                          title="Cancel Subscription"
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-slate-400 hover:bg-red-50 hover:text-red-600 border border-slate-200 hover:border-red-100 transition-all duration-200 shadow-sm"
                        >
                          <i className="bi bi-pause-fill text-base"></i>
                        </button>
                      </div>
                      ) : (
                        <div className="flex justify-end">
                        <button
                          onClick={() => onDelete(sub._id)}
                          title="Delete Subscription"
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-slate-400 hover:bg-red-50 hover:text-red-600 border border-slate-200 hover:border-red-100 transition-all duration-200 shadow-sm"
                        >
                          <i className="bi bi-person-x text-base"></i>
                        </button>
                      </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <span>Subscriptions Found: {subscriptions.length}</span>
        <span>Admin control panel</span>
      </div>
    </div>
  );
}

export default Subscriptions;