import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Pagination from '../layout/Pagination';

function StampDash() {
  const [stamps, setStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- New State for Filters ---
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const itemsPerPage = 10;
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const categories = [
    "Arts & Culture", "Famous Figures", "Sports",
    "Events / International Days", "Nature & Science", "Food & Traditions",
    "Government & History", "Health & Society", "Other"
  ];

  const fetchStamps = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stamps?role=admin");
      const data = await res.json();
      const stampsWithInput = data.map(s => ({ ...s, tempStock: s.stock }));
      setStamps(stampsWithInput);
    } catch (err) {
      toast.error("Failed to load stamps.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStamps();
  }, []);

  // --- Filtering Logic ---
  const filteredStamps = stamps.filter(stamp => {
    const matchesSearch = stamp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || stamp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations based on filtered list
  const totalPages = Math.ceil(filteredStamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStamps = filteredStamps.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filtering
  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const onCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };

  const onTempStockChange = (id, value) => {
    setStamps(prev => prev.map(s => 
      s._id === id ? { ...s, tempStock: value } : s
    ));
  };

  const onSaveStock = async (id, newStock) => {
    const stockNum = parseInt(newStock);
    if (isNaN(stockNum) || stockNum < 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    try {
      const res = await fetch(`/api/stamps/${id}/stock`, {
        method: 'PATCH',
        headers: { 
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock: stockNum })
      });

      if (res.ok) {
        toast.success(`Stock updated to ${stockNum}`);
        setStamps(prev => prev.map(s => 
          s._id === id ? { ...s, stock: stockNum } : s
        ));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to update stock");
      }
    } catch (err) {
      toast.error("Network error.");
    }
  };

  const onSetArchiveStatus = async (stampId, isCurrentlyArchived) => {
    try {
      const res = await fetch(`/api/stamps/${stampId}?archive=${!isCurrentlyArchived}`, {
        method: 'PATCH',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        toast.success(isCurrentlyArchived ? "Restored" : "Archived");
        fetchStamps();
      }
    } catch (err) { toast.error("Action failed"); }
  };

  const onDelete = async (stampId) => {
    if (!window.confirm("Delete permanently?")) return;
    try {
      const res = await fetch(`/api/stamps/delete/${stampId}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      if (res.ok) {
        toast.success("Deleted");
        setStamps(stamps.filter(stp => stp._id !== stampId));
      }
    } catch (err) { toast.error("Error deleting"); }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Catalogue Management</h2>
          <p className="text-slate-500 text-sm mt-1 font-light">Inventory and Issue Date control.</p>
        </div>
        <Link to="/admindash/stampform" className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-200">
          <i className="bi bi-plus-lg mr-2"></i> New Stamp
        </Link>
      </header>

      {/* --- Filter Bar --- */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text"
            placeholder="Search by stamp name..."
            value={searchQuery}
            onChange={onSearchChange}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
        <div className="relative">
          <i className="bi bi-filter absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <select 
            value={categoryFilter}
            onChange={onCategoryChange}
            className="pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm appearance-none cursor-pointer font-medium text-slate-700"
          >
            <option value="All">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <i className="bi bi-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading...</p>
          </div>
        ) : filteredStamps.length === 0 ? (
          <div className="py-24 text-center">
            <i className="bi bi-inbox text-4xl text-slate-200 mb-4 block"></i>
            <p className="text-slate-400 font-medium">No stamps found matching your criteria.</p>
          </div>
        ) : (
          <>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stamp & Issue Date</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Manage Stock</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Price</th>
                  <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentStamps.map((stamp) => (
                  <tr key={stamp._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-100">
                          <img src={`http://localhost:5000/uploads/${stamp.image}`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm mb-1">{stamp.name}</div>
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span className="text-slate-400 uppercase tracking-tighter">Issue Date:</span>
                            <span className="text-blue-500">
                              {stamp.issueDate ? new Date(stamp.issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-5">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-500`}>
                        {stamp.category}
                      </span>
                      {stamp.isArchived && (
                        <div className="mt-1">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-600`}>
                            Archived
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-8 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <input 
                          type="number"
                          value={stamp.tempStock}
                          onChange={(e) => onTempStockChange(stamp._id, e.target.value)}
                          className={`w-20 bg-slate-50 border ${stamp.stock !== parseInt(stamp.tempStock) ? 'border-blue-400 ring-1 ring-blue-100' : 'border-slate-200'} rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 outline-none transition-all`}
                        />
                        <button 
                          onClick={() => onSaveStock(stamp._id, stamp.tempStock)}
                          disabled={stamp.stock === parseInt(stamp.tempStock)}
                          className={`p-1.5 rounded-lg transition-all ${stamp.stock !== parseInt(stamp.tempStock) ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-300 opacity-50 cursor-not-allowed'}`}
                        >
                          <i className="bi bi-check-lg"></i>
                        </button>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="font-bold text-slate-900 text-sm">{Number(stamp.price).toFixed(3)}</span>
                        <span className="text-[10px] font-bold text-slate-400">TND</span>
                      </div>
                    </td>

                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onSetArchiveStatus(stamp._id, stamp.isArchived)}
                          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all ${stamp.isArchived ? 'bg-amber-50 border-amber-100 text-amber-600' : 'bg-white border-slate-200 text-slate-400 hover:text-blue-600'}`}
                        >
                          <i className={`bi ${stamp.isArchived ? 'bi-archive-fill' : 'bi-archive'}`}></i>
                        </button>
                        <button
                          onClick={() => onDelete(stamp._id)}
                          className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-100 flex items-center justify-center transition-all"
                        >
                          <i className="bi bi-trash"></i>
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
        <span>Stamps Found: {stamps.length}</span>
        <span>Admin control panel</span>
      </div>
    </div>
  );
}

export default StampDash;