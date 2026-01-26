import React from 'react'
import { Link } from 'react-router-dom';

function News() {
    return (
        <section className="px-2">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Latest News</span>
            <Link to="" className="text-slate-900 font-bold text-sm block mb-2 no-underline hover:text-blue-600 transition-colors">
                Annual collection 2024
            </Link>
            <p className="text-slate-500 text-sm font-light leading-relaxed">
                Discover the new annual collection for 2024, featuring exquisite commemorative issues.
            </p>
        </section>
    )
}

export default News