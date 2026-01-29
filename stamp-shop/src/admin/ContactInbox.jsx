import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Pagination from '../layout/Pagination';

function ContactInbox() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setLoading(true);
    fetch("/api/contactentries")
      .then((res) => res.json())
      .then((data) => {
        setEntries(data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
        setLoading(false);
      })
  }, [])
  
  // Pagination calculations
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEntries = entries.slice(startIndex, startIndex + itemsPerPage);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const onResolve = async (id) => {
    const confirmed = window.confirm( "Are you sure you want to mark this entry as resolved? This action cannot be undone.");
    if (!confirmed) return;
    try{
      const res=await fetch('/api/contactentries/'+ id,{
        method:'DELETE',
        headers: { Authorization: 'Bearer ' + token }
      })
      if(res.ok){
        alert("The entry has been marked as resolved and removed from the inbox.");
        setEntries(entries.filter(entry=>entry._id!==id));
      }
      else{
        const data=await res.json();
        alert("Error:"+ data.error);
      }
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Contact Inbox</h2>
          <p className="text-slate-500 text-sm mt-1">Manage and respond to philatelic inquiries.</p>
        </div>
      </header>

      <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
        
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-slate-300">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-xs uppercase font-bold tracking-widest">Loading entries...</p>
              </div>
            ) : entries.length == 0 ? (
              <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <i className="bi bi-search text-4xl text-slate-200 mb-4 block"></i>
                <p className="text-slate-500 font-light">No entries found.</p>
              </div>
            ) : (
              <>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200">
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sender</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                      <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Management</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentEntries.map((msg) => (
                      <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="font-bold text-slate-900 text-sm">{msg.fullName}</div>
                          <div className="text-[14px] text-slate-400 font-medium">{msg.email}</div>
                        </td>
                        <td className="px-8 py-5 text-sm text-slate-600 font-medium">{msg.subject}</td>
                        <td className="px-8 py-5 text-sm text-slate-600 font-medium">{msg.message}</td>
                        <td className="px-8 py-5 text-sm text-slate-400 font-mono">{format(new Date(msg.createdAt), 'PPpp')}</td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex justify-end ">
                            <button
                              onClick={() => onResolve(msg._id)}
                              title="Mark as resolved"
                              className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-green-50 hover:text-green-600 border border-slate-100 hover:border-green-100 transition-all duration-200 shadow-sm"
                            >
                              <i className="bi bi-check-lg text-lg transition-transform"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}

      </div>
      <div className="mt-6 px-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
        <span>Entries Found: {entries.length}</span>
        <span>Admin control panel</span>
      </div>
    </div>
  );
}

export default ContactInbox;