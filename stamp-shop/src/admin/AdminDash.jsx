import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';

function AdminDash() {
  const active='bg-blue-600 text-white shadow-lg shadow-blue-900/20';
  const inactive='text-slate-400 hover:bg-slate-800 hover:text-slate-200';
  const link='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 p-8 hidden lg:block sticky top-0 h-screen">
        <div className="mb-12 flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <i className="bi bi-shield-lock-fill text-xl"></i>
          </div>
          <span className="font-bold tracking-tight text-lg">Poste Admin</span>
        </div>
        
        <nav className="space-y-3">
          <NavLink to="stampdash" className={({isActive})=>`${link} ${isActive ? active : inactive}`}>
            <i className="bi bi-grid-fill"></i> Catalogue 
          </NavLink>
          <NavLink to="contactinbox" className={({isActive})=>`${link} ${isActive ? active : inactive}`}>
            <i className="bi bi-envelope-fill"></i> Contact Inbox
          </NavLink>
          <NavLink to="subscriptions" className={({isActive})=>`${link} ${isActive ? active : inactive}`}>
            <i className="bi bi-people-fill"></i> Subscriptions
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area - Centered Wrapper */}
      <main className="flex-1 flex justify-center overflow-y-auto">
        <div className="w-full max-w-[1200px] p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminDash;