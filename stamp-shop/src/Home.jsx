import React from "react";
import { Link } from "react-router-dom";
import slide1 from "./images/slide1.png";

function Home() {
  // Styles to match the Catalogue/Contact aesthetic
  const featureBox = "group flex flex-col items-center p-10 bg-slate-50 rounded-[2.5rem] transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 hover:-translate-y-3";
  const iconStyle = "w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 text-slate-400";

  return (
    <main className="min-h-screen">
      
      {/* --- HERO CAROUSEL SECTION --- */}
      <section className="relative overflow-hidden">
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
          {/* Refined Indicators */}
          <div className="carousel-indicators mb-12">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active !w-10 !h-1 bg-blue-600"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className="!w-10 !h-1 bg-blue-600"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" className="!w-10 !h-1 bg-blue-600"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active relative h-[650px]">
              <img src={slide1} className="d-block w-100 h-full object-cover brightness-[0.8]" alt="Slide 1" />
              {/* Luxury Text Overlay */}
              <div className="absolute inset-0 flex flex-col justify-center px-[10%] bg-gradient-to-r from-black/40 to-transparent text-white">
                <h1 className="text-6xl font-light tracking-tight leading-tight mb-4">
                  Preserving the <br /> <span className="font-bold">Art of Philately.</span>
                </h1>
                <p className="text-lg font-light text-slate-200 max-w-lg mb-8">
                  Journey through Tunisia's history, one stamp at a time. Discover the 2024 collection today.
                </p>
                <Link to="/catalogue" className="inline-block w-fit bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20">
                  Explore Catalogue
                </Link>
              </div>
            </div>
            {/* ... Repeat for other items ... */}
          </div>
        </div>
      </section>

      {/* --- FEATURED SERVICES SECTION --- */}
      <section className="max-w-[1300px] mx-auto px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light text-slate-900 mb-4 tracking-tight">Our Services</h2>
          <div className="h-1 bg-blue-600 w-12 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Card 1 */}
          <div className={featureBox}>
            <div className={iconStyle}>
              <i className="bi bi-printer text-xl"></i>
            </div>
            <h5 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">Manufacture Stamps</h5>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
              Learn how to produce your own stamps efficiently and with quality assurance.
            </p>
            <Link to="/printing" className="text-blue-600 font-bold text-[10px] uppercase tracking-widest group-hover:underline">Learn More</Link>
          </div>

          {/* Card 2 */}
          <div className={featureBox}>
            <div className={iconStyle}>
              <i className="bi bi-mailbox text-xl"></i>
            </div>
            <h5 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">The New Issue</h5>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
              Stay updated on the latest stamp issues and get all the details on new releases.
            </p>
            <Link to="/catalogue" className="text-blue-600 font-bold text-[10px] uppercase tracking-widest group-hover:underline">View Issues</Link>
          </div>

          {/* Card 3 */}
          <div className={featureBox}>
            <div className={iconStyle}>
              <i className="bi bi-calendar3 text-xl"></i>
            </div>
            <h5 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">2024 Collection</h5>
            <p className="text-slate-400 text-sm font-light leading-relaxed mb-8">
              Discover the official 2024 stamp program and plan your collection accordingly.
            </p>
            <Link to="/catalogue" className="text-blue-600 font-bold text-[10px] uppercase tracking-widest group-hover:underline">Plan Collection</Link>
          </div>

        </div>
      </section>

      {/* --- REFINED CTA SECTION --- */}
      <section className="bg-slate-50 py-20 px-8 text-center border-y border-slate-100">
        <h3 className="text-3xl font-light text-slate-900 mb-4">Start your collection today.</h3>
        <p className="text-slate-400 text-sm mb-10 max-w-md mx-auto font-light leading-relaxed">
          Access the full archive of Tunisian philatelic history and manage your subscriptions online.
        </p>
        <Link to="/signup" className="inline-block border border-slate-200 text-slate-600 px-10 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
          Create an Account
        </Link>
      </section>

    </main>
  );
}

export default Home;