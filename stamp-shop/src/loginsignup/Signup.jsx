import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [countries, setCountries] = useState([]);

  const [form, setForm] = useState({
    title: "",
    firstname: "",
    lastname: "",
    corporate: "",
    address: "",
    postcode: "",
    city: "",
    country: "Tunisia",
    email: "",
    phone: "",
    fax: "",
    username: "",
    password: "",
    confirmpassword: ""
  });

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
    if(form.password!==form.confirmpassword){
      alert("Passwords do not match");
      return;
    }
    alert("Account created successfully!");
    console.log(form);
  };

  const validForm = () => {
    return (
      form.title && form.firstname && form.lastname && 
      form.address &&form.city && form.country && form.phone &&
      form.username && form.password &&
      form.password == form.confirmpassword
    );
  }

  return (
    <div className="container mt-5 mb-5">

      <h2 className="text-center">
        Set up your own Tunisian Stamp Shop account
      </h2>

      <p className="text-center text-muted mb-4">
        Enjoy express checkout and guaranteed security
      </p>

      <form onSubmit={onSubmit} className="p-4 bg-white border rounded">

        <div className="mb-3 d-flex justify-content-around">
          <div><input type="radio" name="title" className="ms-3" value="Mr" checked={form.title=='Mr'} onChange={(e) => setForm({...form, title: e.target.value})} /> Mr</div>
          <div><input type="radio" name="title" className="ms-3" value="Mrs" checked={form.title=='Mrs'} onChange={(e) => setForm({...form, title: e.target.value})} /> Mrs</div>
          <div><input type="radio" name="title" className="ms-3" value="Ms" checked={form.title=='Ms'} onChange={(e) => setForm({...form, title: e.target.value})} /> Ms</div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name *</label>
            <input type="text" className="form-control" value={form.firstname} onChange={(e) => setForm({...form, firstname: e.target.value})} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name *</label>
            <input type="text" className="form-control" value={form.lastname} onChange={(e) => setForm({...form, lastname: e.target.value})} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Téléphone *</label>
            <input type="text" className="form-control" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Fax N°</label>
            <input type="text" className="form-control" value={form.fax} onChange={(e) => setForm({...form, fax: e.target.value})} />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Corporate</label>
          <input type="text" className="form-control" value={form.corporate} onChange={(e) => setForm({...form, corporate: e.target.value})} />
        </div>

        <div className="mb-3">
          <label className="form-label">Address *</label>
          <input type="text" className="form-control" value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} />
        </div>

        <div className="mb-3">
          <label className="form-label">Country *</label>
          <select className="form-select" value={form.country} onChange={e => setForm({...form, country:e.target.value})}>
            <option value="" disabled>Select a country</option>
            {countries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="row">
          <div className="col-md-8 mb-3">
            <label className="form-label">City *</label>
            <input type="text" className="form-control" value={form.city} onChange={(e) => setForm({...form, city: e.target.value})} />
          </div>
          
          <div className="col-md-4 mb-3">
            <label className="form-label">Post Code</label>
            <input type="text" className="form-control" value={form.postcode} onChange={(e) => setForm({...form, postcode: e.target.value})} />
          </div>
        </div>

        <hr />

        <div className="mb-3">
          <label className="form-label">Nom d'accès *</label>
          <input type="text" className="form-control" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />
        </div>

        <div className="mb-3">
          <label className="form-label">Mot de passe *</label>
          <input type="password" className="form-control" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmez le mot de passe *</label>
          <input type="password" className="form-control" value={form.confirmpassword} onChange={(e) => setForm({...form, confirmpassword: e.target.value})} />
        </div>

        <button className="btn btn-dark w-100 mt-2" disabled={!validForm()}>
          Create Account
        </button>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </form>
    </div>
  );
}

export default Signup;
