import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import tunisianpost from ".././images/tunisianposte.png";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AdminDash({ setLoggedIn }) {

  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/home");
    toast.success("Logout successful!");
  }

  const active='bg-blue-600 text-white shadow-lg shadow-blue-900/20';
  const inactive='text-slate-400 hover:bg-slate-800 hover:text-slate-200';
  const link='w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200';

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-slate-300 p-8 hidden lg:flex flex-col justify-between sticky top-0 h-screen border-r border-slate-800">
        
        {/* Top Section: Logo & Nav */}
        <div>
        <div className="mb-12 flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <img src={tunisianpost} alt="Tunisian Post" />
          </div>
          <span className="font-bold tracking-tight text-lg">Tunisian Post</span>
        </div>
        
        <nav className="space-y-3">
          <NavLink to="stampdash" className={({isActive})=>`${link} ${isActive ? active : inactive}`}>
            <i className="bi bi-grid-fill"></i> Catalogue 
          </NavLink>
          <NavLink to="userdash" className={({isActive})=>`${link} ${isActive ? active : inactive}`}>
            <i className="bi bi-people-fill"></i> Users
          </NavLink>
          <NavLink to="subscriptions" className={({isActive})=>`${link} ${isActive ? active : inactive}`}>
            <i className="bi bi-bookmark-star-fill"></i> Subscriptions
          </NavLink>
           <NavLink to="orderdash" className={({isActive})=>`${link} ${isActive ? active : inactive}`}>
            <i className="bi bi-bag-fill"></i> Orders
          </NavLink>
          <NavLink to="contactinbox" className={({isActive})=>`${link} ${isActive ? active : inactive}`}>
            <i className="bi bi-envelope-fill"></i> Contact Inbox
          </NavLink>
        </nav>
        </div>
        <div className="pt-6 border-t border-slate-800">
          <button 
            onClick={logout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 text-sm font-bold rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
              <i className="bi bi-box-arrow-right"></i>
            </div>
            <span>Sign Out</span>
          </button>
        </div>
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