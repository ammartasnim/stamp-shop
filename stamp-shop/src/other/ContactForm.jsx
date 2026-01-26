import React, { useState } from 'react'
import toast from 'react-hot-toast';

function ContactForm() {
    const [form,setForm]=useState({
        fullName:'',
        email:'',
        subject:'',
        message:''
    })
    const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    subject: false,
    message: false
  });
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const onSubmit= async (e)=>{
        e.preventDefault();
        try{
            const res=await fetch('/api/contactentries',{
                method:'POST',
                headers:{ 'Content-Type':'application/json' },
                body: JSON.stringify(form)
            })
            if(res.ok){
                toast.success("Your entry has been sent successfully.");
                setForm({
                    fullName:'',
                    email:'',
                    subject:'',
                    message:''
                });
                setTouched({
                    fullName: false,
                    email: false,
                    subject: false,
                    message: false
                  });
                setErrors({
                    fullName: '',
                    email: '',
                    subject: '',
                    message: ''
                  });
            }
            else{
                const data=await res.json();
                toast.error("Error:"+ data.error);
            }
        }catch(err){
            console.error(err);
            toast.error("An unexpected error occurred.");
        }
    }

    const validForm = () => {
    return (
      form.fullName.length >= 3 &&
      emailRegex.test(form.email) &&
      form.subject.trim() !== '' &&
      form.message.length >= 10
    );
  };
  const errorMsgs = (field) => {
    setTouched({ ...touched, [field]: true });
    const newErrors = { ...errors };
   

    if (field === "fullName") {
      if (!form.fullName) newErrors.fullName = "Full name is required";
      else if (form.fullName.length < 3) newErrors.fullName = "Full name must be at least 3 characters";
      else newErrors.fullName = "";
    }

    if (field === "email") {
      if (!form.email) newErrors.email = "Email is required";
      else if (!emailRegex.test(form.email)) newErrors.email = "Email format is invalid";
      else newErrors.email = "";
    }

    if (field === "subject") {
      if (!form.subject) newErrors.subject = "Subject is required";
      else newErrors.subject = "";
    }

    if (field === "message") {
      if (!form.message) newErrors.message = "Message is required";
      else if (form.message.length < 10) newErrors.message = "Message must be at least 10 characters";
      else newErrors.message = "";
    }

    setErrors(newErrors);
  };
    const labelClass = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";
    const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-300";
  
  return (
    <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a message</h3>
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input type="text" className={inputClass} placeholder="John Doe" value={form.fullName} 
                  onChange={(e) => setForm({...form, fullName: e.target.value})} onBlur={() => errorMsgs("fullName")} />
                  {errors.fullName && touched.fullName && (
                    <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type="email" className={inputClass} placeholder="john@example.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} onBlur={() => errorMsgs("email")} />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <label className={labelClass}>Subject</label>
                <input type="text" className={inputClass} placeholder="Inquiry about Annual Collection 2024" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} onBlur={() => errorMsgs("subject")} />
                {errors.subject && touched.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
                )}
              </div>
              <div>
                <label className={labelClass}>Message</label>
                <textarea rows="5" className={inputClass} placeholder="How can we help you?" value={form.message} 
                onChange={(e) => setForm({...form, message: e.target.value})} onBlur={() => errorMsgs("message")}></textarea>
                {errors.message && touched.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
              </div>
              <button type='submit' disabled={!validForm()} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                Send Message
              </button>
            </form>
    </div>
  )
}

export default ContactForm