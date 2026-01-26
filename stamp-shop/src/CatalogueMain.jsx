import React from 'react'

function CatalogueMain({ onSelectCategory }) {
    const categories = [
    "Arts & Culture", "Famous Figures", "Sports", "Postal / Philately",
    "Events / International Days", "Nature & Science", "Food & Traditions",
    "Government & History", "Health & Society", "Other"
  ];

  return (
    <div>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {categories.map((cat) => (
              <div key={cat} className="group cursor-pointer" onClick={()=>onSelectCategory(cat)}>
                <div className="h-40 w-full bg-slate-50 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-slate-100 group-hover:shadow-xl group-hover:shadow-slate-200/50 group-hover:-translate-y-1">
                  <i className="bi bi-envelope-paper text-slate-200 text-4xl group-hover:text-blue-500 transition-colors"></i>
                </div>
                <h5 className="text-slate-800 font-bold text-xs uppercase tracking-wider text-center px-2 group-hover:text-blue-600 transition-colors">
                  {cat}
                </h5>
              </div>
            ))}
          </div>
    </div>
  )
}

export default CatalogueMain