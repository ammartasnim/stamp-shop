import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

function SubscriptionStatus({ setSubscribed }) {
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
  const formattedDate = subscription && subscription.createdAt ? format(new Date(subscription.createdAt), 'dd MMMM, yyyy') : '';

  const onCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your subscription? This action will stop all future automatic stamp reservations."
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/subscriptions/${subscription._id}`, {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        alert("Your subscription has been cancelled.");
        setSubscription(null);
      }
      else {
        alert("Failed to cancel the subscription. Please try again later.");
        const data = await res.json();
        console.log("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while cancelling the subscription. Please try again later.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-6 animate-in fade-in duration-700">
      {/* <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Philately Plan</h1>
        <p className="text-slate-500 mt-2">View your automated stamp subscription details and delivery preferences.</p>
      </div> */}

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
                {/* Active Status Badge */}
                <div className='flex justify-between'>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <i className="bi bi-box-seam-fill text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-l font-bold text-slate-900 uppercase">{subscription.frequency} billing cycle</h3>
                      <p className="text-slate-400 text-sm font-medium uppercase tracking-tighter italic">{subscription.type},000 TND Deposit</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start mb-10">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${subscription.active ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                      <span className={`w-1 h-1 rounded-full ${subscription.active ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                      {subscription.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-50">
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Shipping Method</p>
                    <p className="text-md font-bold text-slate-700">{subscription.mode.replaceAll('_', ' ')},000TND</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Account Created</p>
                    <p className="text-md font-bold text-slate-700">{formattedDate}</p>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Subscription Content</p>
                  <div className="flex flex-wrap gap-3">
                    {subscription.products.map((p, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl flex items-center gap-4">
                        <span className="text-sm font-bold text-slate-700">{p.category}</span>
                        <span className="bg-white border border-slate-200 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-blue-600 shadow-sm">
                          {p.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (<div>No active subscription found.</div>)}
          </div>
        </div>

        {/* Right Column: Sidebar Actions */}
        <aside className="space-y-6">
          {/* Help/Support Box */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl">
            <div className='flex items-center gap-3'>
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <i className="bi bi-info-circle-fill text-blue-400 text-xl"></i>
              </div>
              <h4 className="font-bold text-lg mb-6">Need to adjust?</h4>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              To change your delivery frequency or update your preferred categories, please reach out to our philatelic agents.
            </p>
            <div className='flex justify-center'>
              <Link to='/contact' className=" py-4 px-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
              Message Support
            </Link>
            </div>
          </div>

          {/* New Danger Zone Box (Replaced Official Partner) */}
          <div className="bg-white border border-red-100 rounded-[2.5rem] p-8 shadow-sm">
            {subscription && subscription.active ? (
              <div>
                <h4 className="text-red-600 font-bold text-sm uppercase tracking-widest mb-3">Discontinue service</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  Once canceled, you will lose your spot in the automatic reservation queue for limited edition issues.
                </p>
                <button
                  onClick={onCancel}
                  className="w-full py-4 border border-red-200 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  Cancel Subscription
                </button></div>
            ) : (
              <div>
                <h4 className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-3">Renew service</h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-6">
                  Renew your subscription to regain your spot in the automatic reservation queue for limited edition issues.
                </p>
                <Link to='/subscribe'
                  className="w-full p-4 my-4 border border-emerald-200 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm active:scale-95"
                >
                  Renew Subscription
                </Link></div>
            )}
          </div>
        </aside>

      </div>
    </div >
  );
}

export default SubscriptionStatus;