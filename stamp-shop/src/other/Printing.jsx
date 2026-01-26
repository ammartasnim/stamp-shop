import React from 'react';
import { Link } from 'react-router-dom';

function PrintingWorks() {
    const listStyle = "flex items-center gap-3 text-slate-500 text-[13px] font-light py-1";
    const contactLabel = "text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1";

    return (
        <div className="bg-slate-50 min-h-screen py-12 px-6">
            <div className="max-w-[1100px] mx-auto">

                {/* Compact Header */}
                <div className="mb-12 border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="max-w-xl">
                        <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px] mb-2 block">Industrial Division</span>
                        <h1 className="text-4xl font-light text-slate-900 tracking-tight">Stamp Printing Works</h1>
                    </div>
                    <p className="text-slate-400 text-sm font-light max-w-xs md:text-right">
                        Providing high-security philatelic production for Tunisia and international partners since 1888.
                    </p>
                </div>

                <div className="grid md:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Infrastructure & Process (Tighter Grid) */}
                    <div className="md:col-span-8 space-y-8">

                        {/* 1. Infrastructure Card */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <i className="bi bi-gear-fill text-blue-600"></i>
                                Technical Infrastructure
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                                <div className={listStyle}><i className="bi bi-check2-circle text-blue-500"></i> Electronic Inking Control</div>
                                <div className={listStyle}><i className="bi bi-check2-circle text-blue-500"></i> Pre-printing Laboratory</div>
                                <div className={listStyle}><i className="bi bi-check2-circle text-blue-500"></i> Six Multi-group Machines</div>
                                <div className={listStyle}><i className="bi bi-check2-circle text-blue-500"></i> Continuous Paper Rotation</div>
                            </div>
                        </div>

                        {/* 2. Process Timeline (Compact Layout) */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-slate-900 mb-8">Production Lifecycle</h3>
                            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                                {[
                                    { t: "Sketch Design", d: "National competition for graphists and painters." },
                                    { t: "Color Selection", d: "Professional film preparation and color specs." },
                                    { t: "Plate Development", d: "Industrial scale engraving from mounting films." },
                                    { t: "Printing & Punching", d: "Final security processing and perforation." }
                                ].map((step, idx) => (
                                    <div key={idx} className="relative pl-10 group">
                                        <div className="absolute left-0 top-1 w-6 h-6 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center group-hover:border-blue-500 transition-colors">
                                            <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-600">{idx + 1}</span>
                                        </div>
                                        <h6 className="text-[13px] font-bold text-slate-900 mb-1 uppercase tracking-wider">{step.t}</h6>
                                        <p className="text-slate-400 text-xs font-light leading-relaxed">{step.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Contact & Security (Sidebars) */}
                    <div className="md:col-span-4 space-y-6">

                        {/* Security Guarantee Box */}
                        <div className="bg-slate-900 p-8 rounded-3xl text-white">
                            <div className='flex  gap-2 items-center'><i className="bi bi-shield-lock text-3xl text-blue-500 mb-2 block"></i>
                            <h4 className="text-lg font-bold mb-2">Security Protocol</h4></div>
                            <p className="text-slate-400 text-xs font-light leading-relaxed">
                                Complete security oversight from initial manufacturing through to the certified destruction of printing refuse.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-2">
                            <div >
                                <span className={contactLabel}>Tunisian Postal Printing Office</span>
                                <p className="text-slate-600 text-[13px] leading-snug font-light">
                                    Parc Technologique des Communications,  <br /> Route de Raoued Km 3,<br />2083 Ariana, Tunisia
                                </p>
                                 </div>
                                 <div className='pt-2'>
                                    <span className={contactLabel}>Email</span>
                                <a href="mailto:imprimerie@poste.tn" className="text-blue-600 text-xs font-semibold hover:underline block">imprimerie@poste.tn</a>
                           
                                 </div>

                            <div className="pt-2 border-t border-slate-50">
                                <span className={contactLabel}>Direct Inquiries</span>
                                <p className="text-slate-600 text-[13px] font-light">T: +216 71 856 677 - 71 856 382 - 71 857 255</p>
                                <p className="text-slate-600 text-[13px] font-light">F: +216 71 856 855</p>
                            </div>
                        </div>

                        <div className="bg-blue-600 rounded-2xl p-6 text-center text-white">
                                    <h3 className="text-xl font-bold mb-2">Still need help?</h3>
                                    <p className="text-blue-100 mb-3 text-sm">Our team is available to assist you with any technical or order-related questions.</p>
                                    <Link to="/contact" className="inline-block bg-white text-blue-600 px-7 py-3 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">
                                      Contact Support
                                    </Link>
                                  </div>


                    </div>
                </div>
            </div>

        </div>
    );
}

export default PrintingWorks;