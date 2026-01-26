import React from 'react';
import ContactForm from './ContactForm';

function Contact() {
  const labelClass = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";
  const infoBlock = "flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm";

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Contact Us</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light">
            Have questions about a specific stamp issue or your order? Our Philatelic Center team is here to help.
          </p>
          <div className="h-1 bg-blue-600 w-12 mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-12 gap-12">
          
          {/* Left Side: Contact Information */}
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Philatelic Center</h3>
            
            <div className={infoBlock}>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <i className="bi bi-geo-alt text-blue-600 text-lg"></i>
              </div>
              <div>
                <span className={labelClass}>Office Address</span>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The Tunisian Post - Postal Complexe,<br />
                  Habib Bourguiba Street's,<br />
                  2080 Ariana - Tunisia
                </p>
              </div>
            </div>

            <div className={infoBlock}>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <i className="bi bi-envelope text-blue-600 text-lg"></i>
              </div>
              <div>
                <span className={labelClass}>E-mail</span>
                <a href="mailto:philatelie@poste.tn" className="text-blue-600 font-semibold text-sm hover:underline">
                  philatelie@poste.tn
                </a>
              </div>
            </div>

            <div className={infoBlock}>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                <i className="bi bi-telephone text-blue-600 text-lg"></i>
              </div>
              <div>
                <span className={labelClass}>Phone & Fax</span>
                <p className="text-slate-600 text-sm">
                  <span className="font-medium">Phone:</span> 00 216 71 719 579
                </p>
                <p className="text-slate-600 text-sm">
                  <span className="font-medium">Fax:</span> 00 216 71 714 085
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 bg-white p-7 md:p-9 rounded-3xl border border-slate-100 shadow-xl">
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;