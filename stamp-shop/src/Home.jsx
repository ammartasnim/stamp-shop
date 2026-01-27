import React from "react";
import { Link } from "react-router-dom";
import NewArrivals from "./NewArrivals.jsx";
import slide1 from "./images/slide1.png";

function Home({ loggedIn, activeSubscription }) {
  // Tightened card styles
  const featureBox = "group flex flex-col items-center p-8 bg-white border border-slate-100 rounded-[2rem] transition-all duration-500 hover:shadow-xl hover:shadow-blue-100/40 hover:-translate-y-2";
  const iconStyle = "w-12 h-12 bg-[#FBFBFC] rounded-xl flex items-center justify-center mb-6 border border-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 text-blue-600 shadow-sm";

  return (
    <main className="min-h-screen bg-white">
      
      {/* --- HERO SECTION: SLIGHTLY SMALLER --- */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="carousel slide h-full" data-bs-ride="carousel">
          <div className="carousel-inner h-full">
            <div className="carousel-item active relative h-full">
              <img src={slide1} className="d-block w-full h-full object-cover brightness-[0.75]" alt="Hero" />
              
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 bg-black/10">
                <span className="text-blue-400 font-black text-[9px] uppercase tracking-[0.5em] mb-4">
                  Official Philatelic Archive
                </span>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none mb-6">
                  PRESERVING <br /> THE <span className="text-blue-500">ART.</span>
                </h1>
                <p className="text-sm md:text-base font-medium text-slate-200 max-w-lg mb-8 opacity-90 leading-relaxed">
                  A journey through Tunisia's heritage, captured in every perforation.
                </p>
                <Link to="/catalogue" className="bg-blue-600 text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-blue-600 transition-all shadow-lg active:scale-95">
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES: COMPACT GRID --- */}
      <section className="max-w-[1100px] mx-auto px-8 py-20">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-blue-600 font-black text-[9px] uppercase tracking-[0.4em] mb-3">Our Expertise</span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Curated Services</h2>
          <div className="h-1 bg-blue-600 w-10 mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className={featureBox}>
            <div className={iconStyle}>
              <i className="bi bi-layers-half text-lg"></i>
            </div>
            <h5 className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Production</h5>
            <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">Manufacture</h3>
            <p className="text-slate-400 text-[11px] font-bold leading-relaxed mb-6 uppercase tracking-tight opacity-70">
              Quality assurance for official stamp production cycles.
            </p>
            <Link to="/printing" className="mt-auto flex items-center gap-2 text-slate-900 font-black text-[9px] uppercase tracking-widest hover:text-blue-600 transition-colors">
              Details <i className="bi bi-arrow-right text-[8px]"></i>
            </Link>
          </div>

          {/* Card 2 */}
          <div className={featureBox}>
            <div className={iconStyle}>
              <i className="bi bi-postcard-heart text-lg"></i>
            </div>
            <h5 className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">New Arrivals</h5>
            <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">The New Issue</h3>
            <p className="text-slate-400 text-[11px] font-bold leading-relaxed mb-6 uppercase tracking-tight opacity-70">
              Instant access to the latest releases and covers.
            </p>
            <Link to="/catalogue" className="mt-auto flex items-center gap-2 text-slate-900 font-black text-[9px] uppercase tracking-widest hover:text-blue-600 transition-colors">
              View <i className="bi bi-arrow-right text-[8px]"></i>
            </Link>
          </div>

          {/* Card 3 */}
          <div className={featureBox}>
            <div className={iconStyle}>
              <i className="bi bi-shield-check text-lg"></i>
            </div>
            <h5 className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">Official</h5>
            <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">2024 Collection</h3>
            <p className="text-slate-400 text-[11px] font-bold leading-relaxed mb-6 uppercase tracking-tight opacity-70">
              Manage your professional philatelic subscription.
            </p>
            <Link to="/catalogue" className="mt-auto flex items-center gap-2 text-slate-900 font-black text-[9px] uppercase tracking-widest hover:text-blue-600 transition-colors">
              Plan <i className="bi bi-arrow-right text-[8px]"></i>
            </Link>
          </div>

        </div>
      </section>

      <section className="pb-20">
        <NewArrivals />
      </section>

      {/* --- SMALLER CTA --- */}
      <section className="px-8 pb-20">
        <div className="max-w-[800px] mx-auto bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-center relative overflow-hidden shadow-xl shadow-slate-100">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tighter uppercase">
            Join the <span className="text-blue-500">Elite</span> Circle.
          </h3>
          <p className="text-slate-400 text-[10px] mb-8 max-w-xs mx-auto font-bold uppercase tracking-widest leading-normal">
            Manage subscriptions and track rare issues online.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            {loggedIn && activeSubscription ? (
              <Link to="/subscription" className="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all">
              Subscription
            </Link>
            ): loggedIn && !activeSubscription ? (
              <Link to="/subscribe" className="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all">
              Subscribe
            </Link>
            ):(
              <Link to="/signup" className="bg-white text-slate-900 px-8 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all">
              Create Account
            </Link>
            )}
            <Link to="/contact" className="border border-slate-700 text-white px-8 py-3.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] hover:border-white transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;