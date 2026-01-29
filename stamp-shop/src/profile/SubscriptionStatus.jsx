import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function SubscriptionStatus() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  
  useEffect(() => {
    
    setLoading(true);
    fetch("/api/subscriptions/me", {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then((res) => res.json())
      .then((data) => {
        setSubscription(data.subscription);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [token])

  const formattedDate = subscription && subscription.createdAt 
    ? format(new Date(subscription.createdAt), 'dd MMMM, yyyy') 
    : '';

  const onCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription? This action will stop all future automatic stamp reservations."
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/subscriptions/${subscription._id}`, {
        method: 'POST', // Or DELETE depending on your API
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        toast.success("Your subscription has been cancelled.");
        setSubscription(null);
      } else {
        toast.error("Failed to cancel the subscription.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-6 animate-in fade-in duration-700">
      <div className="grid lg:grid-cols-3 gap-8 items-start">

        {/* Left Column: Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-xs uppercase font-bold tracking-widest">Loading Subscription...</p>
              </div>
            ) : subscription ? (
              <div>
                <div className='flex justify-between items-start'>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <i className="bi bi-box-seam-fill text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-l font-bold text-slate-900 uppercase">{subscription.frequency} billing</h3>
                      <p className="text-slate-400 text-sm font-medium uppercase tracking-tighter italic">Tier: {subscription.type},000 TND</p>
                    </div>
                  </div>
                  
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${subscription.active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                    <span className={`w-1 h-1 rounded-full ${subscription.active ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                    {subscription.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {/* Fund & Shipping Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-slate-50">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Remaining Funds</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-2xl font-black text-blue-600">{Number(subscription.fund).toFixed(3)}</p>
                      <span className="text-[10px] font-bold text-slate-400">TND</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Shipping Method</p>
                    <p className="text-sm font-bold text-slate-700 leading-tight">
                      {subscription.mode.split('_').join(' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Enrolled Since</p>
                    <p className="text-sm font-bold text-slate-700">{formattedDate}</p>
                  </div>
                </div>

                {/* Updated Products List (Array of Strings) */}
                <div className="mt-10">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Selected Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {subscription.products.map((category, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 px-4 py-2 rounded-xl flex items-center gap-2 group hover:border-blue-200 transition-colors">
                        <i className="bi bi-check2-circle text-blue-500"></i>
                        <span className="text-xs font-bold text-slate-600">{category}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-slate-400 font-medium mb-4">No active subscription found.</p>
                <Link to="/subscribe" className="text-blue-600 font-bold text-sm underline">Start a Plan</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Sidebar Actions */}
        <aside className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
            <div className='flex items-center gap-3 mb-6'>
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <i className="bi bi-info-circle-fill text-blue-400 text-xl"></i>
              </div>
              <h4 className="font-bold text-lg">Manage Plan</h4>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-8">
              To top up your funds or change your categories, please contact our philatelic support team.
            </p>
            <Link to='/contact' className="block text-center py-4 px-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              Contact us
            </Link>
          </div>

          {/* Action Box */}
          <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
            {subscription && subscription.active ? (
              <div>
                <h4 className="text-red-600 font-bold text-[10px] uppercase tracking-widest mb-3">Danger Zone</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  Pausing or canceling will release your priority spot for new arrivals.
                </p>
                <button
                  onClick={onCancel}
                  className="w-full py-4 border border-red-100 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all active:scale-95"
                >
                  Cancel Subscription
                </button>
              </div>
            ) : (
              <div>
                <h4 className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-3">Re-activate</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  Ready to resume your collection? Renew your deposit to start receiving stamps again.
                </p>
                <Link to='/subscribe' className="block text-center w-full p-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                  Renew Subscription
                </Link>
              </div>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}

export default SubscriptionStatus;