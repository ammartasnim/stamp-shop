import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 mt-6 pb-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200"
      >
        Previous
      </button>
      
      <span className="text-sm text-slate-600">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-slate-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;