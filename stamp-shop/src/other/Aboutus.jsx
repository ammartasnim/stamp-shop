import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterBox from './NewsletterBox';

function AboutUs({ setShowNewsletter, setSubscribed }) {
  const sectionHeading = "text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3";
  const cardStyle = "p-8 bg-white border border-slate-100 rounded-3xl shadow-sm";

  const titles=["Associations", "E-commerce","National posts"]
  const links = [
    {title: ["American Philatelic Society", "Royal Philatelic Society of Canada", "British North America Philatelic Society"],
      link: ["https://stamps.org",
        "https://www.rpsc.org",
        "https://www.bnaps.org"]
    },
    {
      title: ["efleurs", "e-Stamps - Tunisia", "Lebanon Stamp Shop", "Australian Stamps", "New Zealand Post"],
      link: ["https://e-fleurs.poste.tn",
        "https://e-stamps.poste.tn",
        "https://www.lebstamp.com",
        "http://www.2.auspost.com.au/stamps/intro.asp",
        "http://www.nzstamps.co.nz/nzstamps/index.html"
      ]
    },
    {
      title: ["La Poste - France", "CanadaPost - Canada", "La Poste Tunisienne", "Tunisia Stamps"],
      link: ["https://www.laposte.fr",
        "https://www.canadapost-postescanada.ca/cpc/en/home.page",
        "https://www.poste.tn",
        "http://www.tunisia-stamps.tn"]
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">About Tunisian Stamps</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Preserving the heritage and artistry of Tunisia through philately since 1888.
          </p>
          <div className="h-1 bg-blue-600 w-12 mx-auto mt-6"></div>
        </div>

        {/* 1. Welcome & Newsletter Section */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="space-y-6 flex flex-col justify-center">
            <h2 className={sectionHeading}>Welcome to our Shop</h2>
            <p className="text-slate-600 leading-relaxed">
              Dear customers, welcome to the Tunisian Stamps Shop. Our platform enables you to discover and collect the finest Tunisian philatelic products with ease.
            </p>
            <ul className="space-y-3">
              {[
                "Get exclusive information about new Tunisian stamp issues.",
                "Buy stamps and limited-edition products securely online.",
                "Open an account to receive products automatically."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <i className="bi bi-check-circle-fill text-blue-600 mt-0.5"></i>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Updated Newsletter Box: White/Light Grey with Blue Button */}
  <NewsletterBox setShowNewsletter={setShowNewsletter} setSubscribed={setSubscribed} />
        </div>

        {/* 2. History Section */}
        <div className={cardStyle}>
          <h2 className={sectionHeading}>
            <i className="bi bi-bank text-blue-600"></i>
            Our History
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-600 leading-relaxed">
            <p className="md:col-span-2">
              The tradition of collecting postage stamps is deeply rooted in Tunisian culture. It goes back to the end of the 19th century, just after the birth of the first Tunisian stamp on <strong>July 1st, 1888</strong>. Ever since, interest for philately has increasingly developed.
            </p>
            <div className="bg-slate-50 p-4 -mt-12 mr-1 rounded-xl border border-slate-100 flex flex-col justify-center items-center text-center">
              <span className="text-3xl font-black text-slate-900">1,600+</span>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-widest mt-1">Stamps Issued</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-6 leading-relaxed">
            The Tunisian background includes various products composed of first day covers, notebooks, luxury proofs, and postcards—illustrations related to history, geography, land, and men, treating various themes like fauna, flora, and technology.
          </p>
        </div>

        {/* 3. Combined Directory (The Links) */}
        <div className="pt-8">
          <h2 className={sectionHeading}>Philatelic Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {titles.map((title, i) => (
              <div key={i} className="border-l-2 border-slate-200 pl-6 py-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links[i].title.map((text, j) => (
                    <li key={j}>
                      <a href={links[i].link[j]} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-700 hover:text-blue-600 no-underline transition-colors flex items-center justify-between group">
                        {text}
                        <i className="bi bi-arrow-right text-slate-300 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all"></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Contact Footer */}
        <div className="bg-slate-900 rounded-3xl p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-2">Philatelic Center</h3>
            <p className="text-slate-400 text-sm italic">40 Street Hedi Cheker Beb El Kadhra, Tunis 1075</p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 text-center md:text-right">
            <div className="text-sm">
              <p className="text-slate-400">Phone</p>
              <p className="font-mono">+216 71 719 579 </p>
            </div>
            <div className="text-sm">
              <p className="text-slate-400">Fax</p>
              <p className="font-mono">+216 71 714 085</p>
            </div>
            <div className="text-sm">
              <p className="text-slate-400">Email</p>
              <p className="font-semibold">philatelie@poste.tn</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;