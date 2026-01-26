import React from 'react';
import { Link } from 'react-router-dom';
import tunisianpost from ".././images/tunisianposte.png";

function Footer() {
  const linkHeader = "text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4";
  const linkStyle = "text-slate-500 hover:text-blue-600 transition-colors text-sm no-underline font-light";

  return (
    <footer className="bg-white border-t border-slate-100 pt-10 pb-8 px-8">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-9">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div>
                <img src={tunisianpost} alt="" style={{height:"35px"}}/>
              </div>
              <span className="font-bold tracking-tight text-slate-900">La Poste Tunisienne</span>
            </div>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Official Philatelic Portal of Tunisia. Preserving the art of the stamp since 1888.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className={linkHeader}>Navigate</h5>
            <ul className="list-none p-0 space-y-2 flex flex-col">
              <Link to="/" className={linkStyle}>Home</Link>
              <Link to="/catalogue" className={linkStyle}>Catalogue</Link>
              <Link to="/about" className={linkStyle}>About Us</Link>
              <Link to="/faq" className={linkStyle}>Help & FAQ</Link>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className={linkHeader}>Support</h5>
            <ul className="list-none p-0 space-y-2 flex flex-col">
              <Link to="/contact" className={linkStyle}>Contact Support</Link>
              <Link to="/terms" className={linkStyle}>Terms of Service</Link>
            </ul>
          </div>

          {/* Social / Direct Link */}
          <div>
            <h5 className={linkHeader}>Connect</h5>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/TunisianPost/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://www.instagram.com/poste_tn/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://x.com/Poste_Tn" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 transition-all">
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-50 pt-2 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-[11px] font-medium tracking-wide">
            © 2026 LA POSTE TUNISIENNE — PHILATELIC CENTER.
          </p>
          <div className="flex gap-6">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Tunis, Tunisia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;