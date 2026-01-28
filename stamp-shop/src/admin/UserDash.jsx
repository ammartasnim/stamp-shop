import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function UserDash() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    // Assumes an endpoint that returns users populated with their subscription status
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

  const onDeleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        toast.success("The user has been deleted.");
        setUsers(users.filter(user => user._id !== id));
      }
      else {
        toast.error("Failed to delete the user. Please try again later.");
        const data = await res.json();
        console.log("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the user. Please try again later.");
    }
  }

  // const toggleUserRole = async (id, currentRole) => {
  //   const newRole = currentRole === 'admin' ? 'user' : 'admin';
  //   if (!window.confirm(`Change user role to ${newRole}?`)) return;

  //   try {
  //     const res = await fetch(`/api/admin/users/${id}/role`, {
  //       method: 'PUT',
  //       headers: { 
  //         'Authorization': 'Bearer ' + token,
  //         'Content-Type': 'application/json' 
  //       },
  //       body: JSON.stringify({ role: newRole })
  //     });
  //     if (res.ok) fetchUsers();
  //   } catch (err) {
  //     alert("Failed to update role.");
  //   }
  // };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Directory</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and monitor platform users.</p>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading Users...</p>
          </div>
        ) : (
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
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/30 transition-colors group">
                    {/* User Identity */}
                    <td className="pl-8 pr-4 py-5">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-sm">
                          {user.firstname} {user.lastname}
                        </span>
                        <span className="text-[10px] font-mono text-blue-500 font-bold bg-blue-50 px-1.5 py-0.5 rounded w-fit mt-1">
                          @{user.username}
                        </span>
                        {user.corporate && (
                           <span className="text-[10px] text-slate-400 mt-1 italic">{user.corporate}</span>
                        )}
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="px-4 py-5">
                      <div className="flex flex-col gap-0.5">
                        <div className="flex items-center gap-2 text-slate-600">
                          <i className="bi bi-envelope text-[10px]"></i>
                          <span className="text-[11px] font-medium">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <i className="bi bi-geo-alt text-[10px]"></i>
                            <span className="text-[10px]">
                                {user.country}, {user.city}
                                {user.address && `, ${user.address}`}
                                {user.postcode && `, ${user.postcode}`}
                            </span>                        
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <i className="bi bi-telephone text-[10px]"></i>
                          <span className="text-[10px]">{user.phone}</span>
                        </div>
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td className="px-4 py-5 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter 
                        ${user.role === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Subscription Status */}
                    <td className="px-4 py-5 text-center">
                      {user.isSubscribed ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-black uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Subscribed
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Join Date */}
                    <td className="px-4 py-5">
                      <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">
                        {user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : '—'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="pl-4 pr-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                        onClick={() => onDeleteUser(user._id)}
                          title="Delete User"
                          className="flex items-center justify-center w-8 h-8 rounded-lg bg-white text-slate-400 hover:bg-slate-900 hover:text-white border border-slate-200 transition-all shadow-sm"
                        >
                          <i className="bi bi-person-x text-base"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="mt-6 px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <span>Users Found: {users.length}</span>
        <span>Admin control panel</span>
      </div>
    </div>
    
  );
}

export default UserDash;