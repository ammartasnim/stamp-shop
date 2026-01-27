import React, { useState, useEffect } from 'react';
import ChangePassword from './ChangePassword';

export function PersonalInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    fetch("/api/users/me", {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  
  function InfoField({ label, value, isMono = false }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</p>
      <div className={`bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 truncate ${isMono ? 'font-mono' : ''}`}>
        {value || '—'}
      </div>
    </div>
  );
}

  if (loading) return <div className="py-20 text-center text-slate-400 font-black text-[10px] uppercase tracking-widest">Loading...</div>;

  return (
    <div className="grid lg:grid-cols-5 gap-6 items-start">
      
      {/* COLUMN 1: Identity Card */}
      <section className="bg-white col-span-3 border border-slate-200 rounded-[2rem] p-8 shadow-sm h-full">
        <header className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white text-sm">
            <i className="bi bi-person-badge"></i>
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Identity</h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Personal information</p>
          </div>
        </header>

        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <InfoField label="First Name" value={user?.firstname} />
            <InfoField label="Last Name" value={user?.lastname} />
          </div>
          <InfoField label="Username" value={`@${user?.username}`} isMono />
          <InfoField label="Email Address" value={user?.email} />
          <InfoField label="Phone" value={user?.phone || 'Not provided'} />
        </div>
      </section>

      {/* COLUMN 2: Security Card */}
      <section className="bg-white col-span-2 border border-slate-200 rounded-[2rem] p-8 shadow-sm h-full">
        <ChangePassword />

        
      </section>
    </div>
  );
}


export default PersonalInfo