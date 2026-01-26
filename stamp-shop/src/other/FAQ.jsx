import React from 'react';
import { Link } from 'react-router-dom';

function FAQ() {
  const sectionTitle = "text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3";
  const questionBox = "p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-200 transition-colors";
  const stepCircle = "w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0";

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Help & FAQ</h1>
          <p className="text-slate-500 text-lg font-light">
            Everything you need to know about navigating our philatelic collection.
          </p>
          <div className="h-1 bg-blue-600 w-12 mx-auto mt-6"></div>
        </div>

        <div className="space-y-12">
          
          {/* 1. How do I buy? - Step Process */}
          <section>
            <h2 className={sectionTitle}>
              <i className="bi bi-cart3 text-blue-600"></i>
              How do I buy?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                "Browse the product catalogue",
                "Choose your product",
                "Add to shopping basket",
                "Enter shipping address",
                "Select payment mode"
              ].map((step, index) => (
                <div key={index} className="flex md:flex-col items-center gap-4 md:text-center">
                  <span className={stepCircle}>{index + 1}</span>
                  <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-slate-200 w-full"></div>

          {/* 2. Grid for other Questions */}
          <div className="grid md:grid-cols-2 gap-6">
            
            <article className={questionBox}>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i className="bi bi-search text-blue-500"></i>
                How to find a product?
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Our site features a dedicated search engine allowing you to access desired products directly and quickly. Look for the search icon in the catalogue sidebar.
              </p>
            </article>

            <article className={questionBox}>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i className="bi bi-wallet2 text-blue-500"></i>
                Electronic Dinar?
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                To facilitate the use of the Electronic Dinar, we have provided a 
                <a href="https://www.poste.tn/index_service.php?code_menu=82&code_sous_menu=95" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold mx-1 hover:underline">User Guide</a> 
                placed at your disposal for easy transactions.
              </p>
            </article>

            <article className={questionBox}>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i className="bi bi-person-plus text-blue-500"></i>
                Why register?
              </h4>
              <ul className="text-sm text-slate-500 space-y-2 list-none p-0">
                <li className="flex gap-2">
                  <i className="bi bi-check2 text-blue-600"></i> 
                  Receive regular philatelic innovations.
                </li>
                <li className="flex gap-2">
                  <i className="bi bi-check2 text-blue-600"></i> 
                  Save time by being identified automatically during checkout.
                </li>
              </ul>
            </article>

            <article className={questionBox}>
              <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                <i className="bi bi-calendar-check text-blue-500"></i>
                Why subscribe?
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed">
                Subscription allows you to receive a set quantity of products at chosen intervals (per issue, quarterly, or annually). Simply fill out the form and pay the subscription fee.
              </p>
            </article>

          </div>

          {/* Contact Support Footer */}
          <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-xl font-bold mb-2">Still need help?</h3>
            <p className="text-blue-100 mb-6 text-sm">Our team is available to assist you with any technical or order-related questions.</p>
            <Link to="/contact" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold text-sm hover:bg-slate-100 transition-colors">
              Contact Support
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default FAQ;