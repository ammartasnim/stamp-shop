import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

function ProfileLayout() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 animate-in fade-in duration-700">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Personal Dashboard</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your philatelic activity and account details.</p>
        </div>
        
        {/* Navigation Tabs using NavLink for automatic active styling */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto">
          <NavLink 
            to="personalinfo"
            className={({ isActive }) => 
              `flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`
            }
          >
            Personal Info
          </NavLink>
          <NavLink 
            to="orderhistory"
            className={({ isActive }) => 
              `flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`
            }
          >
            Order History
          </NavLink>
          <NavLink 
            to="subscription"
            className={({ isActive }) => 
              `flex-1 md:flex-none px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isActive ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`
            }
          >
            My Subscription
          </NavLink>
        </div>
      </header>

      <div className="">
        {/* Main Content: This is where Child Routes render */}
        <div className="">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default ProfileLayout;