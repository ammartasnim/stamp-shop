import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function StampDash() {
  const [stamps, setStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const fetchStamps = async () => {
setLoading(true);
    fetch("/api/stamps")
      .then((res) => res.json())
      .then((data) => {
        setStamps(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }

  useEffect(() => {
    fetchStamps();
  }, []);

  const onArchive = async (stampId) => {
    const confirmed = window.confirm(
      "Are you sure you want to archive this stamp?"
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/stamps/${stampId}`, {
        method: 'PATCH',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        toast.success("The stamp has been archived.");
        fetchStamps();
      }
      else {
        const data = await res.json();
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while archiving the stamp. Please try again later.");
    }
  }
  const onUnarchive = async (stampId) => {
    try {
      const res = await fetch(`/api/stamps/unarchive/${stampId}`, {
        method: 'PATCH',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        toast.success("The stamp has been restored.");
        fetchStamps();
      }
      else {
        const data = await res.json();
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while restoring the stamp. Please try again later.");
    }
  }
  const onDelete = async (stampId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this stamp? This action cannot be undone."
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/stamps/delete/${stampId}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      })
      if (res.ok) {
        toast.success("The stamp has been deleted.");
        setStamps(stamps.filter(stp => stp._id !== stampId));
      }
      else {
        const data = await res.json();
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while deleting the stamp. Please try again later.");
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Catalogue Management</h2>
          <p className="text-slate-500 text-sm mt-1">Review, update, and archive your stamp catalogue.</p>
        </div>
        <Link to="/admindash/stampform" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
          <i className="bi bi-plus-lg mr-2"></i> New Stamp
        </Link>
      </header>

      {/* Unified Table Style */}
      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading Stamps...</p>
          </div>
        ) : stamps.length == 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <i className="bi bi-search text-4xl text-slate-200 mb-4 block"></i>
            <p className="text-slate-500 font-light">No stamps found.</p>
          </div>) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stamp name</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stamps.map((stamp) => (
                <tr key={stamp.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <i className="bi bi-image text-slate-300"></i>
                      </div>
                      <span className="font-bold text-slate-900 text-sm">{stamp.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    {stamp.isArchived ? (
                      <span className='px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-600'>
                      Archived
                    </span>
                    ):(
                      <span className='px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500'>
                      {stamp.category}
                    </span>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold text-slate-900 text-sm">{parseFloat(stamp.price).toFixed(3)}</span>
                      <span className="text-[10px] font-bold text-slate-400">TND</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      {stamp.isArchived ? (
                        <button
                        title="Unarchive stamp"
                        onClick={() => onUnarchive(stamp._id)}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 border border-slate-100 hover:border-blue-100 transition-all duration-200 shadow-sm"
                      >
                        <i className="bi bi-archive-fill text-lg transition-transform"></i>
                      </button>) : (
                        <button
                        title="Archive stamp"
                        onClick={() => onArchive(stamp._id)}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 border border-slate-100 hover:border-blue-100 transition-all duration-200 shadow-sm"
                      >
                        <i className="bi bi-archive-fill text-lg transition-transform"></i>
                      </button>)}
                      <button
                        title="Delete stamp"
                        onClick={() => onDelete(stamp._id)}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 border border-slate-100 hover:border-red-100 transition-all duration-200 shadow-sm"
                      >
                        <i className="bi bi-trash text-lg transition-transform"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="mt-6 px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <span>Stamps Found: {stamps.length}</span>
        <span>Admin control panel</span>
      </div>
    </div>
  );
}

export default StampDash;