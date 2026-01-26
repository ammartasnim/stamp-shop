import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Subscribe({ setSubscribed }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        type: "",
        frequency: "",
        mode: "",
        products: [] // Array of { cat: string, quantity: number }
    });

    const labelClass = "block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3";
    const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all";
    const radioContainer = "flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 transition-all";

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + (localStorage.getItem('token') || sessionStorage.getItem('token'))
                },
                body: JSON.stringify(form)
            });

            if (res.ok) {
                toast.success("Subscription successful!");
                setSubscribed(true);
                navigate("/subscription");
            } else {
                const data = await res.json();
                toast.error("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred.");
        }
    }

    const validForm = () => {
        return form.type && form.frequency && form.mode && form.products.length > 0;
    }

    const categories = [
        "Arts & Culture", "Famous Figures", "Sports", "Postal / Philately",
        "Events / International Days", "Nature & Science", "Food & Traditions",
        "Government & History", "Health & Society", "Other"
    ];

    const addCategory = (category) => {
        setForm(prev => ({
            ...prev,
            products: [...prev.products, { category, quantity: 1 }]
        }));
    };

    const removeCategory = (category) => {
        setForm(prev => ({
            ...prev,
            products: prev.products.filter(p => p.category !== category)
        }));
    };

    const updateQuantity = (category, quantity) => {
        setForm(prev => ({
            ...prev,
            products: prev.products.map(p => p.category === category ? { ...p, quantity } : p)
        }));
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-6">
            <div className="max-w-[1100px] mx-auto">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Philatelic Subscription</h1>
                    <p className="text-slate-500 text-sm max-w-2xl mx-auto font-light leading-relaxed">
                        Customize your recurring philatelic deliveries by selecting themes and frequencies.
                    </p>
                    <div className="h-1 bg-blue-600 w-12 mx-auto mt-6"></div>
                </div>

                <form onSubmit={onSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-12">

                    {/* 1. Subscription Tier */}
                    <section>
                        <label className={labelClass}>Deposit Tier (TND) *</label>
                        <div className="grid md:grid-cols-3 gap-4">
                            {['100', '300', '500'].map((value) => (
                                <label key={value} className={`${radioContainer} ${form.type === value ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' : ''}`}>
                                    <input
                                        type="radio"
                                        name="type"
                                        className="w-4 h-4 accent-blue-600"
                                        value={value}
                                        checked={form.type === value}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    />
                                    <span className="text-sm font-bold text-slate-700">{value},000 TND</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-16">
                        {/* 2. Product Categories */}
                        <section>
                            <label className={labelClass}>Subscription Items *</label>
                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {categories.map((category) => {
                                    const selected = form.products.find(p => p.category == category);
                                    return (
                                        <div key={category} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${selected ? 'bg-white border-blue-200 shadow-sm' : 'bg-slate-50 border-transparent'}`}>
                                            <span className={`text-xs font-bold ${selected ? 'text-slate-900' : 'text-slate-400'}`}>{category}</span>

                                            {selected ? (
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={selected.quantity}
                                                        onChange={e => updateQuantity(category, Number(e.target.value))}
                                                        className="w-14 bg-white border border-slate-200 rounded-lg py-1 text-center text-xs font-bold outline-none focus:border-blue-500"
                                                    />
                                                    <button type="button" onClick={() => removeCategory(category)} className="text-red-400 hover:text-red-600 p-1">
                                                        <i className="bi bi-x-circle-fill"></i>
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => addCategory(category)}
                                                    className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-800"
                                                >
                                                    + Add
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 3. Frequency & Mode */}
                        <section className="space-y-10">
                            <div>
                                <label className={labelClass}>Delivery Frequency *</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['issue', 'quarterly', 'semi-annual', 'annual'].map((freq) => (
                                        <label key={freq} className={`${radioContainer} py-3 ${form.frequency === freq ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' : ''}`}>
                                            <input
                                                type="radio"
                                                name="frequency"
                                                className="accent-blue-600"
                                                value={freq}
                                                checked={form.frequency === freq}
                                                onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                                            />
                                            <span className="text-[10px] uppercase tracking-widest font-black text-slate-600">{freq.replace('-', ' ')}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Shipping Method *</label>
                                <select className={inputClass} value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })}>
                                    <option value="" disabled>Select Method</option>
                                    <option value="International_Express_32">International Express (32.000 TND)</option>
                                    <option value="International_Express_39">International Express (39.000 TND)</option>
                                    <option value="International_Express_51">International Express (51.000 TND)</option>
                                    <option value="Rapid_Post_Tunisia_5">Rapid Post - Tunisia (5.000 TND)</option>
                                    <option value="Registered_Mail_Tunisia_5">Registered Mail - Tunisia (5.000 TND)</option>
                                    <option value="Registered_Mail_International_22">Registered Mail - International (22.000 TND)</option>
                                </select>
                            </div>
                        </section>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 text-slate-400">
                            <i className="bi bi-info-circle"></i>
                            <p className="text-[10px] font-bold uppercase tracking-widest">Advance payment required</p>
                        </div>
                        <div className='flex gap-4 w-full md:w-auto'>
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className='flex-1 md:w-40 py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all'>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className='flex-1 md:w-64 py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:shadow-none'
                                disabled={!validForm()}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Subscribe;