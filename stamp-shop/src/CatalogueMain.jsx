import React from 'react'
import ArtsCulture from './images/cats/ArtsCulture.png'
import FamousFigures from './images/cats/FamousFigures.png'
import Sports from './images/cats/Sports.png'
import NatureScience from './images/cats/NatureScience.png'
import GovernmentHistory from './images/cats/GovernmentHistory.png'
import EventsInternationalDays from './images/cats/EventsInternationalDays.png'
import FoodTraditions from './images/cats/FoodTraditions.png'
import HealthSociety from './images/cats/HealthSociety.png'
import Other from './images/cats/Other.png'



function CatalogueMain({ onSelectCategory }) {
  const categories = [
    "Arts & Culture", "Famous Figures", "Sports",
    "Events / International Days", "Nature & Science", "Food & Traditions",
    "Government & History", "Health & Society", "Other"
  ];

  const normalizeCategory = (cat) =>
    cat.replace(/[ &/]/g, '');
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
        {categories.map((cat) => (
          <div key={cat} className="group cursor-pointer" onClick={() => onSelectCategory(cat)}>
            <div className="h-40 w-full bg-slate-50 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-slate-100 group-hover:shadow-xl group-hover:shadow-slate-200/50 group-hover:-translate-y-1">
              <img
                src={new URL(
                `./images/cats/${normalizeCategory(cat)}.png`,
                import.meta.url
              ).href}
                alt={cat}
                className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
              />
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