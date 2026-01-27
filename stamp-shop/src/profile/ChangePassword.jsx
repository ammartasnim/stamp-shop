import React, { useState } from 'react';
import toast from 'react-hot-toast';

export function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [touched, setTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!validForm()) return;
    if (form.newPassword !== form.confirmPassword) {
      toast.error('Passwords do not match.');
    }
    try {
      const res = await fetch("/api/users/changepassword", {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token 
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        toast.success("Password changed successfully.");
        setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTouched({ currentPassword: false, newPassword: false, confirmPassword: false });
        setErrors({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };
  const validForm = () => form.currentPassword.length >= 5
   && form.newPassword.length >= 5
   && form.confirmPassword.length >= 5;

   const errorMsgs = (field) => {
    setTouched({ ...touched, [field]: true });
    const newErrors = { ...errors };

    if (field == "currentPassword") {
      if (!form.currentPassword) newErrors.currentPassword = "Current password is required";
      else if (form.currentPassword.length < 5) newErrors.currentPassword = "Current password must be at least 5 characters";
      else newErrors.currentPassword = "";
    }
    if (field == "newPassword") {
      if (!form.newPassword) newErrors.newPassword = "New password is required";
      else if (form.newPassword.length < 5) newErrors.newPassword = "New password must be at least 5 characters";
      else newErrors.newPassword = "";
    }
    if (field == "confirmPassword") {
      if (!form.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
      else if (form.confirmPassword.length < 5) newErrors.confirmPassword = "Confirm password must be at least 5 characters";
      else newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
  }
  return (
    <section>
      <header className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100 text-sm">
          <i className="bi bi-shield-lock"></i>
        </div>
        <div>
          <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">Change Password</h3>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest"></p>
        </div>
      </header>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
          <input 
            type="text"
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            value={form.currentPassword}
            onChange={e => {
              setForm({...form, currentPassword: e.target.value});
            }}
            onBlur={() => errorMsgs("currentPassword")}
          />
          {errors.currentPassword && touched.currentPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
          <input 
            type="text"
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            value={form.newPassword}
            onChange={e => setForm({...form, newPassword: e.target.value})}
            onBlur={()=>errorMsgs("newPassword")}
          />
            {errors.newPassword && touched.newPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
            )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
          <input 
            type="text"
            required
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
            value={form.confirmPassword}
            onChange={e => setForm({...form, confirmPassword: e.target.value})}
            onBlur={()=>errorMsgs("confirmPassword")}
          />
            {errors.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
        </div>

        <div className="pt-2">
          <button
                type="submit"
              className='flex w-full justify-center rounded-md bg-[#0d6efd] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!validForm()}
            >
            Update Password
          </button>
        </div>
      </form>
    </section>
  );
}

export default ChangePassword