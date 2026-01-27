import React from 'react';

const NEW_ARRIVALS = [
  {
    id: 1,
    name: '1840 Penny Black',
    price: 350.00,
    image: '/path-to-penny-black.jpg', // Replace with your actual image paths
  },
  {
    id: 2,
    name: 'Airmail Issue #24',
    price: 125.00,
    image: '/path-to-airmail.jpg',
  },
  {
    id: 3,
    name: 'Royal Silver Jubilee',
    price: 45.00,
    image: '/path-to-jubilee.jpg',
  },
  {
    id: 4,
    name: 'France 1924 Olympic',
    price: 80.00,
    image: '/path-to-olympic.jpg',
  },
];

export function NewArrivals() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            New Arrivals
          </h2>
          <p className="text-slate-400 font-medium text-sm">
            Freshly graded additions to our inventory.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {NEW_ARRIVALS.map((stamp) => (
            <div 
              key={stamp.id} 
              className="group bg-white border border-slate-100 rounded-[1.5rem] p-5 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="aspect-square w-full bg-slate-50 rounded-xl overflow-hidden mb-6 flex items-center justify-center p-8">
                <img 
                  src={stamp.image} 
                  alt={stamp.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Stamp Info */}
              <div className="space-y-2 mb-6 px-1">
                <h3 className="font-black text-slate-800 text-[15px] leading-tight">
                  {stamp.name}
                </h3>
                <p className="text-blue-600 font-black text-sm">
                  ${stamp.price.toFixed(2)}
                </p>
              </div>

              {/* Action Button */}
              <button className="w-full bg-slate-50 text-slate-500 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300 active:scale-[0.98]">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewArrivals;