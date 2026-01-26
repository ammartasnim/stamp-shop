import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function StampForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    image: null,
    category: '',
    price: ''
  });
  const [errors, setErrors] = useState({
  name: '',
  image: '',
  category: '',
  price: ''
});

const [touched, setTouched] = useState({
  name: false,
  image: false,
  category: false,
  price: false
});
const errorMsgs = (field) => {
  setTouched({ ...touched, [field]: true });
    const newErrors = { ...errors };

  if (field === 'name') {
    if (!form.name.trim()) newErrors.name = 'Name is required';
    else if (form.name.length < 3) newErrors.name = 'Name must be at least 3 characters';
    else newErrors.name = '';
  }
  if (field === 'category') {
    if (!form.category) newErrors.category = 'Category is required';
    else newErrors.category = '';
  }
  if (field === 'price') {
    if (!form.price) newErrors.price = 'Price is required';
    else if (Number(form.price) < 0.1) newErrors.price = 'Price must equal or be greater than 0.100';
    else newErrors.price = '';
  }
  if (field === 'image') {
    if (!form.image) newErrors.image = 'Image is required';
    else if (!(form.image instanceof File)) newErrors.image = 'Invalid image file';
    else newErrors.image = '';
  }

  setErrors(newErrors);
};


  const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3";
  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300";

  const categories = [
    "Arts & Culture", "Famous Figures", "Sports", "Postal / Philately",
    "Events / International Days", "Nature & Science", "Food & Traditions",
    "Government & History", "Health & Society", "Other"
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('image', form.image);
    formData.append('category', form.category);
    formData.append('price', form.price);
    
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/stamps', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + token },
        body: formData
      });
      if (res.ok) {
        toast.success('Stamp added successfully!');
        setForm({ name: '', image: null, category: '', price: '' });
        setTouched({
        name: false,
        image: false,
        category: false,
        price: false
      });
        setErrors({
        name: '',
        image: '',
        category: '',
        price: ''
      });

      }
      else{
        const data = await res.json();
        toast.error("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

  const validForm = () => {
    return form.name && form.image instanceof File && form.category && parseFloat(form.price) >= 0.1;
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Navigation / Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="group flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-8"
      >
        <i className="bi bi-arrow-left text-lg group-hover:-translate-x-1 transition-transform"></i>
        <span className="text-[10px] font-bold uppercase tracking-widest">Back to Stamp Dashboard</span>
      </button>

      {/* Header Section */}
      <header className="mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create New Stamp</h2>
        <p className="text-slate-500 text-sm mt-1 font-light leading-relaxed">
          Input the official details for the new philatelic release.
        </p>
      </header>

      {/* Form Container */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden p-8 md:p-12">
        <form onSubmit={onSubmit} className="space-y-10">
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Details */}
            <div className="space-y-8">
              <div>
                <label className={labelClass}>Name *</label>
                <input 
                  type="text" 
                  className={inputClass} 
                  placeholder="e.g. Centenary of the Red Crescent" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  onBlur={() => errorMsgs("name")}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Category *</label>
                  <select 
                    className={inputClass}
                    value={form.category}
                    onChange={(e) => setForm({...form, category: e.target.value})}
                    onBlur={() => errorMsgs("category")}
                  >

                    <option value="" disabled>Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.category && touched.category && (
                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Price (TND) *</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.100"
                      className={inputClass} 
                      placeholder="0.750" 
                      value={form.price}
                      onChange={(e) => setForm({...form, price: e.target.value})}
                      onBlur={() => errorMsgs("price")} />
                      {errors.price && touched.price && (
                        <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                      )}
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Image *</label>
                <div className="relative group">
                  <input 
                    type="file" 
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      setForm({...form, image: e.target.files[0]});
                      errorMsgs("image");
                    }}
                  />
                  <label 
                    htmlFor="file-upload" 
                    className="flex items-center justify-between w-full bg-slate-50 border border-slate-200 border-dashed rounded-xl px-5 py-4 cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
                  >
                    <span className="text-sm text-slate-500 font-medium">
                      {form.image ? form.image.name : "Select image"}
                    </span>
                    <i className="bi bi-cloud-arrow-up text-slate-500 text-xl"></i>
                  </label>
                  {errors.image && touched.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: High-End Preview */}
            <div className="flex flex-col">
              <label className={labelClass}>Image Preview</label>
              <div className="flex-1 min-h-[300px] bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                {form.image ? (
                  <div className="relative z-10 animate-in fade-in zoom-in-95 duration-300">
                    <img 
                      src={URL.createObjectURL(form.image)} 
                      alt="Stamp Preview" 
                      className="max-h-64 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] object-contain"
                    />
                    <button 
                      type="button"
                      onClick={() => setForm({...form, image: null})}
                      className="absolute -top-4 -right-4 w-8 h-8 bg-white text-red-500 rounded-full shadow-md flex items-center justify-center hover:bg-red-50 transition-colors"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </div>
                ) : (
                  <div className="text-slate-300">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mx-auto mb-4 border border-slate-100">
                      <i className="bi bi-image text-3xl"></i>
                    </div>
                    <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400">Select image to preview</p>
                  </div>
                )}
                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3 text-slate-400">
               <i className="bi bi-shield-check text-blue-500 text-lg"></i>
               <p className="text-[10px] font-bold uppercase tracking-widest">Create Stamp (Admin Access)</p>
            </div>
            
            <button 
              type="submit"
              disabled={!validForm()}
              className="px-10 py-4 bg-blue-600 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none active:scale-95"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StampForm;