import React from 'react';

function Links() {
  const categories = [
    {
      title: "Associations",
      icon: "bi bi-people",
      links: [
        { name: "American Philatelic Society", url: "#" },
        { name: "Royal Philatelic Society of Canada", url: "#" },
        { name: "Philatelic Computing Study Group", url: "#" },
        { name: "British North America Philatelic Society", url: "#" },
      ]
    },
    {
      title: "E-commerce",
      icon: "bi bi-cart-check",
      links: [
        { name: "efleurs", url: "#" },
        { name: "e-Stamps - Tunisia", url: "#" },
        { name: "Lebanon Stamp Shop", url: "#" },
        { name: "Australian Stamps", url: "#" },
        { name: "New Zealand Post - Philatelic Bureau", url: "#" },
      ]
    },
    {
      title: "Postes Nationales",
      icon: "bi bi-globe-europe-africa",
      links: [
        { name: "La Poste - France", url: "#" },
        { name: "CanadaPost - Canada", url: "#" },
        { name: "La Poste Tunisienne", url: "#" },
        { name: "Tunisia Stamps (Tunisia)", url: "#" },
      ]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Philatelic Directory</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">
            A curated list of international associations, marketplaces, and national postal services for the global collector.
          </p>
          <div className="h-1 bg-blue-600 w-12 mx-auto mt-6"></div>
        </div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <i className={`${cat.icon} text-blue-600 text-xl`}></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{cat.title}</h3>
              </div>

              <ul className="space-y-4 flex-1">
                {cat.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between text-sm text-slate-600 no-underline hover:text-blue-600 transition-colors"
                    >
                      <span className="font-medium">{link.name}</span>
                      <i className="bi bi-arrow-up-right text-slate-300 group-hover:text-blue-600 transition-colors text-xs"></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contribution Note */}
        <div className="mt-16 p-8 bg-slate-900 rounded-2xl text-center">
          <h4 className="text-white font-bold mb-2">Missing a resource?</h4>
          <p className="text-slate-400 text-sm mb-6">If you represent an association or postal service and wish to be listed, please contact us.</p>
          <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
            Suggest a Link
          </button>
        </div>

      </div>
    </div>
  );
}

export default Links;