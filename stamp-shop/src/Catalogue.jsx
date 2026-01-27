import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import News from './other/News';
import CatalogueMain from './CatalogueMain';
import CategoryPage from './CategoryPage';
import StampPage from './StampPage';
import SearchPage from './SearchPage';

function Catalogue({loggedIn, activeSubscription, role}) {
  const [form, setForm] = useState({ search: '' });

  const onSearch = (e) => {
    e.preventDefault();
    setSearchParams(params=>{
      params.set('query', form.search.trim());
      params.delete('category');
      params.delete('stampId');
      return params;
    });
    setForm({ search: '' });
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category');
  const selectedStamp = searchParams.get('stampId');
  const query = searchParams.get('query');
  const selectStamp = (stampId)=>{
    setSearchParams({ category: selectedCategory, stampId: stampId, query: null });
  }
  const selectCategory = (category)=>{
    setSearchParams(params=>{
      params.set('category', category);
      params.delete('stampId');
      return params;
    });
  };
  const onBacktoCategory=()=>{
    setSearchParams(params=>{
      params.set('category', selectedCategory);
      params.delete('stampId');
      params.delete('query');
      return params;
    });
  }
  const onBack=()=>{
    setSearchParams({});
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Centered Header Section */}
      <div className="pt-10 pb-12 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Products Catalogue</h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">
          Browse our curated collection of Tunisian philatelic issues and postal history.
        </p>
        <div className="h-1 bg-blue-600 w-12 mx-auto mt-6"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pb-20 flex flex-col md:flex-row gap-16">

        {/* Main Content Area */}
        <div className="flex-1">
          {!selectedCategory && !query ? (
            <CatalogueMain onSelectCategory={selectCategory} />
          ) : !selectedStamp && !query ? (
            <CategoryPage category={selectedCategory} onSelectStamp={selectStamp} onBack={onBack} />
          ) : query ? (
            <SearchPage query={query} onSelectStamp={selectStamp} onBack={onBack}/>
          ) : (
            <StampPage stampId={selectedStamp} onSelectStamp={selectStamp} onBacktoCategory={onBacktoCategory} role={role} />
          )}
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-slate-200 self-stretch"></div>

        {/* Sidebar Area - Sticky enabled */}
        <div className="w-full md:w-80">
          <div className="sticky top-8 space-y-12">

            {/* Search Section */}
            <section>
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Search Stamps</span>
              <form onSubmit={onSearch} className="relative group">
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-slate-200 py-2 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-300"
                  value={form.search}
                  onChange={(e) => setForm({ ...form, search: e.target.value })}
                  placeholder='Search stamps...'
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-blue-600 transition-colors">
                  <i className="bi bi-search text-lg"></i>
                </button>
              </form>
            </section>

            {/* ENHANCED ATTRACTIVE SUBSCRIBE SECTION */}
            <section className="relative overflow-hidden bg-slate-100 border border-slate-100 rounded-3xl p-4">
              {/* Background Decoration */}
              <div className="relative z-10">
                <div className='flex items-center gap-3'>
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-blue-200 transition-transform ">
                    <i className="bi bi-mailbox2 text-xl"></i>
                  </div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3 block">Collector's Club</span>
                </div>
                <h5 className="text-xl font-bold text-slate-900 mb-3 leading-tight">Never miss a new release again.</h5>
                <p className="text-slate-500 text-sm font-light leading-relaxed mb-3">
                  Get the latest Tunisian stamps delivered directly to your door based on your favorite themes.
                </p>

                {(loggedIn && activeSubscription) ? (
                  <div></div>
                  ):(
                  <Link to="/subscribe"
                  className="inline-flex items-center justify-center w-full py-3 px-6 bg-blue-600 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98]"
                >Join the Circle</Link>
                  )
                }
              </div>
            </section>

            {/* News Section */}
            <News />

          </div>
        </div>

      </div>
    </div>
  );
}

export default Catalogue;