import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Signup({ setLoggedIn }) {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmpassword: ""
  });

  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    username: false,
    password: false,
    confirmpassword: false
  });

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then((res) => res.json())
      .then((data) => {
        const countriesList = data.map(c => c.name.common);
        setCountries(countriesList.sort());
      })
      .catch((err) => console.error(err));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        toast.success("Account created successfully!");
        setLoggedIn(true);
        navigate("/home");
      } else {
        const data = await res.json();
        toast.error("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  };

  const validForm = () => {
    return (
      form.firstname.length > 3 &&
      form.lastname.length > 3 &&
      form.email.length > 5 &&
      form.phone.length >= 8 &&
      form.username.length >= 3 &&
      form.password.length >=5 &&
      form.confirmpassword.length >= 5 &&
      form.password === form.confirmpassword
    );
  }

  const errorMsgs = (field) => {
    setTouched({ ...touched, [field]: true });
    const newErrors = { ...errors };

    if (field === "firstname") {
      if (!form.firstname) newErrors.firstname = "First name is required";
      else if (form.firstname.length < 3) newErrors.firstname = "First name must be at least 3 characters";
      else newErrors.firstname = "";
    }
    if (field === "lastname") {
      if (!form.lastname) newErrors.lastname = "Last name is required";
      else if (form.lastname.length < 3) newErrors.lastname = "Last name must be at least 3 characters";
      else newErrors.lastname = "";
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    if (field === "username") {
      if (!form.username) newErrors.username = "Username is required";
      else if (form.username.length < 3) newErrors.username = "Username must be at least 3 characters";
      else newErrors.username = "";
    }
    if (field === "password") {
      if (!form.password) newErrors.password = "Password is required";
      else if (form.password.length < 5) newErrors.password = "Password must be at least 5 characters";
      else newErrors.password = "";
    }
    if (field === "confirmpassword") {
      if (!form.confirmpassword) newErrors.confirmpassword = "Confirm your password";
      else if (form.confirmpassword !== form.password) newErrors.confirmpassword = "Passwords do not match";
      else newErrors.confirmpassword = "";
    }

    setErrors(newErrors);
  }

  // Common Tailwind classes for inputs to match Login page
  const inputcss = "block w-full rounded-md border-0 py-2 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:line-height-6";
  const labelcss = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className='flex items-center justify-center bg-gray-50 px-5 py-12'>
      <div className='max-w-4xl w-full bg-white py-8 px-8 border shadow-sm rounded-xl space-y-8'>
        <div>
          <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 pb-1'>
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enjoy express checkout and guaranteed security
          </p>
        </div>

        <form onSubmit={onSubmit} className='mt-8 space-y-4'>
          {/* First & Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelcss}>First Name *</label>
              <input type="text" className={inputcss} value={form.firstname}
                onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                onBlur={() => errorMsgs("firstname")}
              />
              {errors.firstname && touched.firstname && (
                <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>
              )}
            </div>
            <div>
              <label className={labelcss}>Last Name *</label>
              <input type="text" className={inputcss} value={form.lastname}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                onBlur={() => errorMsgs("lastname")}
              />
              {errors.lastname && touched.lastname && (
                <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>
              )}
            </div>
          </div>

          <div>
            <label className={labelcss}>Email *</label>
            <input type="email" className={inputcss} value={form.email} placeholder="name@example.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => errorMsgs("email")}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone & Fax Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelcss}>Phone *</label>
              <input type="text" className={inputcss} value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                onBlur={() => errorMsgs("phone")} />
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className={labelcss}>Fax N°</label>
              <input type="text" className={inputcss} value={form.fax} onChange={(e) => setForm({ ...form, fax: e.target.value })} />
            </div>
          </div>

          <div>
            <label className={labelcss}>Corporate / Company</label>
            <input type="text" className={inputcss} value={form.corporate} onChange={(e) => setForm({ ...form, corporate: e.target.value })} />
          </div>

          <div>
            <label className={labelcss}>Country *</label>
            <select className={inputcss} value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}>
              <option value="" disabled>Select a country</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelcss}>City</label>
            <input type="text" className={inputcss} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelcss}>Address</label>
              <input type="text" className={inputcss} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div>
              <label className={labelcss}>Postal Code</label>
              <input type="text" className={inputcss} value={form.postcode} onChange={(e) => setForm({ ...form, postcode: e.target.value })} />
            </div>
          </div>

          <div className="pt-4">
            <div className="relative flex justify-center text-sm font-medium leading-6 mb-4">
              <span className="bg-white px-4 text-gray-400 uppercase tracking-widest text-xs">Login Credentials</span>
              <div className="absolute inset-0 flex items-center -z-10" aria-hidden="true">
                <div className="w-full border-t border-gray-100"></div>
              </div>
            </div>
          </div>

          <div>
            <label className={labelcss}>Username *</label>
            <input type="text" className={inputcss} value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              onBlur={() => errorMsgs("username")} />
            {errors.username && touched.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelcss}>Password *</label>
              <input type="password" className={inputcss} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                onBlur={() => errorMsgs("password")} />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className={labelcss}>Confirm Password *</label>
              <input type="password" className={inputcss} value={form.confirmpassword}
                onChange={(e) => setForm({ ...form, confirmpassword: e.target.value })}
                onBlur={() => errorMsgs("confirmpassword")} />
              {errors.confirmpassword && touched.confirmpassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmpassword}</p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              className='flex w-full justify-center rounded-md bg-[#0d6efd] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!validForm()}
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account? {''}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400">
          By creating an account, you agree to our {''}
          <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;