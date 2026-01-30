import React, { useEffect, useState } from 'react';
import StampCard from './StampCard';
import Pagination from './layout/Pagination';

function StampGrid({ category, query, filter, onSelectStamp, onBack }) {
  const [stamps, setStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    // Construct dynamic URL based on which props are present
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (query) params.append('query', query);
    if (filter) params.append('filter', filter);

    fetch(`/api/stamps/?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setStamps(Array.isArray(data) ? data : []);
        setLoading(false);
        setCurrentPage(1); // Reset to page 1 on new search/filter
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [category, query, filter]);

  const totalPages = Math.ceil(stamps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStamps = stamps.slice(startIndex, startIndex + itemsPerPage);

  // Dynamic Heading logic
  const getHeading = () => {
    if (query) return `Search: "${query}"`;
    if (category) return category;
    if (filter) return filter;
    return "All Products";
  };

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-[1200px] mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors mb-6"
        >
          <i className="bi bi-arrow-left"></i> Back to Catalogue
        </button>

        <div className="flex items-baseline justify-between gap-4 border-b border-slate-100 pb-6 mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
            {getHeading()}
          </h2>
          <span className="text-slate-400 text-sm font-light">
            {stamps.length} Products Found
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-xs uppercase font-bold tracking-widest">Loading Stamps...</p>
          </div>
        ) : stamps.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <i className="bi bi-search text-4xl text-slate-200 mb-4 block"></i>
            <p className="text-slate-500 font-light">No stamps match your selection.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {currentStamps.map((stamp) => (
                <StampCard key={stamp._id} stamp={stamp} onSelectStamp={onSelectStamp} />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default StampGrid;