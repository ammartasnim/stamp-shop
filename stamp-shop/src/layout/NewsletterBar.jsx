import React, { useState } from 'react'
import toast from 'react-hot-toast';

function NewsletterBar({ setShowNewsletter }) {
    const [form, setForm] = useState({
        email: ""
    });

    const validForm = () => {
        return form.email.trim()!=="";
    }
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
    return (
        <form onSubmit={onSubmit} className="flex items-center space-x-2 p-2 rounded-md">
            <label >Join our newsletter to stay updated on the latest news !</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" className="flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400" />
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600" > Subscribe </button>
        </form>
    )
}

export default NewsletterBar