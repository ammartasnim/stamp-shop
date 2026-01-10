import React, { useEffect, useState } from 'react';

function newsletter() {
    const [countries, setCountries] = React.useState([]);
    const [form, setForm] = React.useState({
        firstname: "",
        lastname: "",
        country: "Tunisia",
        email: ""
    })
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all?fields=name')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const countries = data.map(c => c.name.common);
                setCountries(countries.sort());
            })
            .catch((err) => console.error(err));
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        alert("Logged in successfully!");
        console.log(form);
    }
    const validForm = () => {
        return form.firstname && form.lastname && form.country && form.email;
    }
    return (
        <div className="container mt-5 mb-5">

            <h2 className="text-center">
                Mailing list
            </h2>

            <p className="text-center text-muted mb-4">
                Register with our newsletter to receive the current events of philately !
            </p>

            <form onSubmit={onSubmit} className="p-4 bg-white border rounded">

                <div className="mb-3">
                    <label className="form-label">First Name *</label>
                    <input type="text" className="form-control" value={form.firstname} onChange={(e) => setForm({ ...form, firstname: e.target.value })} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name *</label>
                    <input type="text" className="form-control" value={form.lastname} onChange={(e) => setForm({ ...form, lastname: e.target.value })} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>

                <div className="mb-3">
                    <label className="form-label">Country *</label>
                    <select className="form-select" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
                        <option value="" disabled>Select a country</option>
                        {countries.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>

                <button className="btn btn-dark w-100 mt-2" disabled={!validForm()}>
                    Join the mailing list
                </button>

            </form>
        </div>
    )
}

export default newsletter