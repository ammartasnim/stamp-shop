import { Link } from "react-router-dom";
import Cart from "../Cart";
import tunisianpost from ".././images/tunisianposte.png";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import NewsletterBar from "./NewsletterBar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";


function Navbar({ loggedIn, setLoggedIn, role, showNewsletter, setShowNewsletter, username }) {
  const navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    setLoggedIn(false);
    navigate("/home");
    toast.success("Logout successful!");
  }
  const navLinkClass = "text-slate-500 no-underline text-[1.0rem] font-medium pb-0.5 border-b-2 border-transparent transition-all duration-200 hover:text-slate-900 hover:border-slate-900";
  const [openCart, setOpenCart] = useState(false);
  const dropdownRef=useRef(null);
  useEffect(()=>{
    const onClickOutside=(e)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
        setOpenCart(false);
      }
    };
    if(openCart){
      document.addEventListener("mousedown", onClickOutside);
    }
    return ()=>{
      document.removeEventListener("mousedown", onClickOutside);
    }
  },[openCart]);

  const getUserInitials = () => {
    if (!username) return "U";
    return username.charAt(0).toUpperCase();
  };

  return (
    <>
      <nav className="bg-slate-50 border-b border-slate-200 font-sans py-2 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6">

          <div className="flex items-center gap-12">
            {/* Logo area */}
            <div className="flex items-center">
              <Link to='/home'>
              <div className="h-[50px]">
                <img src={tunisianpost} alt="Tunisian Post" className="h-full object-contain" />
              </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <ul className="hidden md:flex gap-8 list-none m-0 p-0 items-center">
              <li><Link to="/home" className={navLinkClass}>Home</Link></li>
              <li><Link to="/catalogue" className={navLinkClass}>Catalogue</Link></li>
              <li><Link to="/aboutus" className={navLinkClass}>About us</Link></li>
              <li><Link to="/FAQ" className={navLinkClass}>FAQ</Link></li>
              <li><Link to="/contact" className={navLinkClass}>Contact</Link></li>
            </ul>
          </div>

          <div className="flex items-center gap-6">
            {role=='admin' &&
            <Link 
                  to="/admindash" 
                  className="flex items-center gap-1.5 px-3 py-2 text-slate-600 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-600 transition-all border border-transparent hover:border-gray-200"
                >
                  <i className="bi bi-speedometer2"></i>
                  <span className="hidden sm:inline">Dashboard</span>
                </Link> }
            {!loggedIn ? (
              <Link 
                to="/login" 
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 shadow-sm transition-all active:scale-95"
              >
                <i className="bi bi-person"></i>
                <span>Login</span>
              </Link>
            ) : (
              <>
                {/* Profile Button */}
                <Link 
                  to="/profile" 
                  className="flex items-center gap-1.5 px-3 py-2 text-slate-600 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-gray-600 transition-all border border-transparent hover:border-gray-200"
                >
                  <div className="w-5 h-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {getUserInitials()}
                  </div>
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                {/* Logout Button */}
                <button 
                  onClick={logout} 
                  className="flex items-center gap-1.5 px-3 py-2 text-slate-600 text-sm font-medium rounded-md hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-200"
                >
                  <i className="bi bi-box-arrow-right"></i>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}

            {/* Cart Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-2 font-bold text-blue-600 border-none transition-all hover:text-blue-500 active:scale-90"
                onClick={(e)=>{
                  e.stopPropagation();
                  setOpenCart((prev)=>!prev);
                }}
              >
                <i className="bi bi-cart text-xl"></i>
              </button>
              {openCart && (
                <div onClick={(e)=>e.stopPropagation()} className="absolute right-0 mt-3 border border-slate-200 rounded-xl shadow-2xl min-w-[350px] overflow-hidden bg-white z-50">
                <div className="p-1 bg-white">
                  <Cart />
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Newsletter Bar */}
      {showNewsletter && (
        <div className="bg-slate-100 border-b border-slate-200 text-slate-700 text-sm flex justify-between items-center px-8 py-0.5">
          <div className="w-8"></div> 
          <NewsletterBar setShowNewsletter={setShowNewsletter} />
          <button 
            className="text-slate-400 hover:text-slate-900 transition-colors flex items-center"
            onClick={() => setShowNewsletter(false)}
          >
            <i className="bi bi-x text-xl"></i>
          </button>
        </div>
      )}
    </>
  );
}

export default Navbar;