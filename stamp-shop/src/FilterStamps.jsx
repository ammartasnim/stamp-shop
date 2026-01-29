import React from 'react';

function FilterStamps({ searchParams, setSearchParams }) {
  const currentFilter = searchParams.get('filter');

  const onFilter = (filterValue) => {
    setSearchParams(params => {
      if (params.get('filter') === filterValue) {
        params.delete('filter');
      } else {
        params.set('filter', filterValue);
        params.delete('query');
        params.delete('stampId');
      }
      return params;
    });
  };

  const btnClass = (isActive) => `
    flex items-center justify-center gap-2 px-3 py-2 rounded-full border transition-all duration-200
    ${isActive 
      ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100' 
      : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:bg-blue-50/50'}
  `;

  return (
    <section>
      {/* Side-by-side grid */}
      <div className="grid grid-cols-2 gap-2">
        <button 
        type='button'
          onClick={() => onFilter('Luxury Edition')}
          className={btnClass(currentFilter === 'Luxury Edition')}
        >
          <i className={`bi bi-gem text-xs ${currentFilter === 'Luxury Edition' ? 'text-blue-200' : 'text-blue-500'}`}></i>
          <span className="text-[10px] font-black uppercase tracking-tight">Luxury Edition</span>
        </button>

        <button 
        type='button'
          onClick={() => onFilter('First Day Cover')}
          className={btnClass(currentFilter === 'First Day Cover')}
        >
          <i className={`bi bi-envelope-paper text-xs ${currentFilter === 'First Day Cover' ? 'text-blue-200' : 'text-blue-500'}`}></i>
          <span className="text-[10px] font-black uppercase tracking-tight">First Day Cover</span>
        </button>
      </div>
    </section>
  );
}

export default FilterStamps;