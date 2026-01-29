import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import Pagination from '../layout/Pagination';

export function UserDash() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // --- Filter States ---
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch("/api/users", {
      headers: { Authorization: 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  // --- Filtering Logic ---
  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstname} ${user.lastname}`.toLowerCase();
    const matchesSearch = 
      fullName.includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "All" || user.role === roleFilter;
    
    const matchesSub = 
      subFilter === "All" || 
      (subFilter === "Subscribed" && user.isSubscribed) || 
      (subFilter === "Inactive" && !user.isSubscribed);

    return matchesSearch && matchesRole && matchesSub;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, subFilter]);

  const onDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        toast.success("User deleted.");
        setUsers(users.filter(u => u._id !== id));
      }
    } catch (err) {
      toast.error("Error deleting user.");
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Directory</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and monitor platform users.</p>
        </div>
      </header>

      {/* --- Filter Bar --- */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text"
            placeholder="Search by name, email or @username..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
          />
        </div>
        
        <div className="flex gap-3">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 outline-none focus:border-blue-500 cursor-pointer shadow-sm"
          >
            <option value="All">All Roles</option>
            <option value="user">Users</option>
            <option value="guest">Guests</option>
          </select>

          <select 
            value={subFilter}
            onChange={(e) => setSubFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 outline-none focus:border-blue-500 cursor-pointer shadow-sm"
          >
            <option value="All">All Status</option>
            <option value="Subscribed">Subscribed</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading Users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="py-24 text-center bg-slate-50/50">
            <i className="bi bi-people text-4xl text-slate-200 mb-4 block"></i>
            <p className="text-slate-400 font-medium">No users found matching those filters.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse table-auto">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="pl-8 pr-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                    <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contact & Location</th>
                    <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Role</th>
                    <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Subscription</th>
                    <th className="px-4 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined</th>
                    <th className="pl-4 pr-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="pl-8 pr-4 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 text-sm">{user.firstname} {user.lastname}</span>
                          <span className="text-[10px] font-mono text-blue-500 font-bold bg-blue-50 px-1.5 py-0.5 rounded w-fit mt-1">@{user.username}</span>
                          {user.corporate && <span className="text-[10px] text-slate-400 mt-1 italic">{user.corporate}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-2 text-slate-600">
                            <i className="bi bi-envelope text-[10px]"></i>
                            <span className="text-[11px] font-medium">{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-[10px]">
                            <i className="bi bi-geo-alt"></i>
                            <span>{user.country}, {user.city}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-5 text-center">
                        <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter bg-slate-100 text-slate-500`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-center">
                        {user.isSubscribed ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Subscribed
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Inactive</span>
                        )}
                      </td>
                      <td className="px-4 py-5 whitespace-nowrap">
                        <span className="text-[11px] font-bold text-slate-500">{user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : '—'}</span>
                      </td>
                      <td className="pl-4 pr-8 py-5 text-right">
                        <button onClick={() => onDeleteUser(user._id)} className="w-8 h-8 rounded-lg bg-white text-slate-400 hover:bg-red-50 hover:text-red-600 border border-slate-200 transition-all shadow-sm">
                          <i className="bi bi-person-x text-base"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
      <div className="mt-6 px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <span>Users Found: {filteredUsers.length}</span>
        <span>Admin control panel</span>
      </div>
    </div>
  );
}

export default UserDash;