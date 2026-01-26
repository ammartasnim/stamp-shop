import React, { useState } from 'react'
import toast from 'react-hot-toast';

function NewsletterBox({ setShowNewsletter }) {
  const [form, setForm] = useState({
          email: ""
      });
  
      const onSubmit = async (e) => {
        e.preventDefault();
        if (!validForm()) { return; }
        try {
            const res = await fetch('/api/newsletters/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email })
            })
            if (res.ok) {
                toast.success("Subscribed successfully!");
                setForm({ email: "" });
                setShowNewsletter(false);
            }
            else {
                const data = await res.json();
                toast.error("Error: " + data.error);
            }
        } catch (err) {
            console.error(err);
            toast.error("An unexpected error occurred.");
        }
    }
      const validForm = () => {
          return form.email.trim()!=="";
      }
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 text-slate-900 shadow-sm flex flex-col justify-center">
    <h3 className="text-xl font-bold mb-2 text-slate-900">Subscribe to our Newsletter</h3>
    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
      Be the first to know about new philatelic innovations and upcoming collections.
    </p>
    <form className="space-y-3" onSubmit={onSubmit}>
      <input 
        type="email" 
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Enter your email" 
        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
      <button className="w-full bg-[#0d6efd] text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-[0.98]">
        Join the Community
      </button>
    </form>
    <p className="text-[10px] text-slate-400 mt-4 text-center">
      We value your privacy. Unsubscribe at any time.
    </p>
  </div>
  )
}

export default NewsletterBox