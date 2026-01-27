import React, { useState, useEffect } from 'react';

function Checkout() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: 'Tunisia',
    city: '',
    address: '',
    postalCode: '',
    paymentMethod: 'E-dinar'
  });
  const [touched, setTouched] = useState({
    fullName: false,
    phone: false,
    email: false,
    city: false,
    address: false,
    postalCode: false
  });
  const [errors, setErrors] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    postalCode: ''
  });

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errorMsgs = (field) => {
    setTouched({ ...touched, [field]: true });
    const newErrors = { ...errors };

    if (field === "fullName") {
      if (!form.fullName) newErrors.fullName = "Full name is required";
      else if (form.fullName.length < 3) newErrors.fullName = "Full name must be at least 3 characters";
      else newErrors.fullName = "";
    }
    
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!regex.test(form.email)) {
      newErrors.email = "Email format is invalid";
    } else {
      newErrors.email = "";
    }
    if (field === "phone") {
      if (!form.phone) newErrors.phone = "Phone number is required";
      else if (form.phone.length < 8) newErrors.phone = "Phone number must be at least 8 digits";
      else newErrors.phone = "";
    }
    if (field === "address") {
      if (!form.address) newErrors.address = "Address is required";
      else if (form.address.length < 3) newErrors.address = "Address must be at least 3 characters";
      else newErrors.address = "";
    }
    if (field === "city") {
      if (!form.city) newErrors.city = "City is required";
      else if (form.city.length < 2) newErrors.city = "City must be at least 2 characters";
      else newErrors.city = "";}
    if (field === "postalCode") {
      if (!form.postalCode) newErrors.postalCode = "Postal code is required";
      else if (form.postalCode.length < 4) newErrors.postalCode = "Postal code must be at least 4 characters";
      else newErrors.postalCode = "";}

    setErrors(newErrors);
  }

  const [countries, setCountries] = useState([]);
  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then((res) => res.json())
      .then((data) => {
        const countriesList = data.map(c => c.name.common);
        setCountries(countriesList.sort());
      })
      .catch((err) => console.error(err));
  }, []);

  const items = [
    { name: 'National Day 2026', price: 1.500, quantity: 2, image: 'stamp1.jpg' },
    { name: 'Mediterranean Flora', price: 0.750, quantity: 1, image: 'stamp2.jpg' }
  ];

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 7.000;
  const totalPrice = subtotal + shipping;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentMethod = (method) => {
    setForm({ ...form, paymentMethod: method });
  };
  const validForm = () => {
    return (
      form.fullName.length > 3 &&
      regex.test(form.email) &&
      form.phone.length >= 8 &&
      form.address.length >= 3 &&
      form.city.length >= 2 &&
      form.postalCode.length >= 4
    );
  }

  const onSubmit = () => {

  }

  const labelcss = "text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block";
  const inputcss = "w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-600 transition-all shadow-sm placeholder:text-slate-300";

  return (
    <div className="bg-white min-h-screen py-12 px-6 animate-in fade-in duration-700">
      <div className="max-w-[1100px] mx-auto">

        {/* Header Section */}
        <div className="mb-12">
          
          <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                <i className="bi bi-check2"></i>
              </div>
              <span className="text-xs font-semibold text-slate-700">Cart</span>
            </div>
            <div className="w-12 h-0.5 bg-blue-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">2</div>
              <span className="text-xs font-semibold text-slate-900">Checkout</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs font-bold">3</div>
              <span className="text-xs font-semibold text-slate-400">Complete</span>
            </div>
          </div>
         <h1 className="text-4xl font-black text-slate-900 tracking-tight text-center">Checkout</h1>
        </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: Shipping Form */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-[#FBFBFC] border border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-[inset_0_2px_15px_rgba(0,0,0,0.01)]">
              
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-100">
                  <i className="bi bi-geo-alt text-xl"></i>
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 leading-none">Delivery Details</h2>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mt-2">Recipient Information</p>
                </div>
              </div>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelcss}>Full Name *</label>
                  <input type="text" name="fullName" value={form.fullName} 
                  onChange={handleInputChange} placeholder="Anis Kamel" 
                  className={inputcss} required 
                  onBlur={() => errorMsgs("fullName")}/>
                  {errors.fullName && touched.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
                </div>
                
                <div>
                  <label className={labelcss}>Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleInputChange}
                  onBlur={() => errorMsgs("email")}
                   placeholder="anis.k@email.com" className={inputcss} required />
                   {errors.email && touched.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
                </div>

                <div>
                  <label className={labelcss}>Phone *</label>
                  <input type="tel" name="phone" value={form.phone}
                  onBlur={() => errorMsgs("phone")}
                   onChange={handleInputChange} placeholder="+216 -- --- ---" className={inputcss} required />
                    {errors.phone && touched.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
                </div>

                <div className="md:col-span-2 pt-4 border-t border-slate-100 mt-2">
                  <label className={labelcss}>Street Address *</label>
                  <input type="text" name="address" value={form.address} 
                  onBlur={() => errorMsgs("address")}
                  onChange={handleInputChange} placeholder="Rue de la Liberté, No. 12" className={inputcss} required />
                  {errors.address && touched.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
                </div>

                <div>
                  <label className={labelcss}>City *</label>
                  <input type="text" name="city" value={form.city} 
                  onBlur={() => errorMsgs("city")}
                  onChange={handleInputChange} placeholder="Tunis" className={inputcss} required />
                  {errors.city && touched.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
                </div>

                <div>
                  <label className={labelcss}>Postal Code *</label>
                  <input type="text" name="postalCode" value={form.postalCode} 
                  onBlur={()=>errorMsgs('postalCode')}
                  onChange={handleInputChange} placeholder="1002" className={inputcss} required />
                  {errors.postalCode && touched.postalCode && (
                <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>
              )}
                </div>

                <div className="md:col-span-2">
                  <label className={labelcss}>Country *</label>
                  <select className={inputcss} value={form.country} onChange={handleInputChange} name="country">
                    <option value="" disabled>Select a country</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <aside className="lg:col-span-2 space-y-6 lg:sticky lg:top-10">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-50/50">
              <h2 className="text-lg font-black text-slate-900 leading-none text-center pb-4">Order Summary</h2>

              <div className="space-y-5 mb-8 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden p-1">
                      <img src={`/uploads/${item.image}`} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{item.name}</p>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-900">{(item.price * item.quantity).toFixed(3)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-6 border-y border-dashed border-slate-100 mb-6">
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">{subtotal.toFixed(3)} TND</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-slate-900">{shipping.toFixed(3)} TND</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Total Price</span>
                <span className="text-3xl font-black text-slate-900">{totalPrice.toFixed(3)}</span>
              </div>

              <div className="mb-8">
                <label className={labelcss}>Payment Method</label>
                <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <button onClick={() => handlePaymentMethod('E-dinar')}
                    className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${form.paymentMethod === 'E-dinar' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>
                    E-Dinar
                  </button>
                  <button onClick={() => handlePaymentMethod('Cash')}
                    className={`py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${form.paymentMethod === 'Cash' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}>
                    Cash
                  </button>
                </div>
              </div>

              <button 
              disabled={!validForm()}
              onClick={()=>onSubmit()}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[12px] font-black uppercase tracking-[0.3em] hover:bg-blue-700 transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                <i className="bi bi-lock-fill text-xs"></i>
                Place Order
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Checkout;