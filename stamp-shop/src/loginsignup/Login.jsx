import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext.jsx';

function Login({ setLoggedIn }) {
  const { getCart, updateToken } = useCart();
  const [form, setForm] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false
  });


  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validForm) return;
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, remember })
      });
      const data = await res.json();
      if (res.ok) {
        if (remember) {
          localStorage.setItem('token', data.token);
        }
        else
          sessionStorage.setItem('token', data.token);

        setLoggedIn(true);
        updateToken();
        await getCart();
        toast.success("Login successful!");
        navigate("/home");
      } else {
        toast.error("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    }
  }

  const validForm = () => form.username.length >= 3 && form.password.length >= 5;

  const errorMsgs = (field) => {
    setTouched({ ...touched, [field]: true });
    const newErrors = { ...errors };

    if (field == "username") {
      if (!form.username) newErrors.username = "Username is required";
      else if (form.username.length < 3) newErrors.username = "Username must be at least 3 characters";
      else newErrors.username = "";
    }
    if (field == "password") {
      if (!form.password) newErrors.password = "Password is required";
      else if (form.password.length < 5) newErrors.password = "Password must be at least 5 characters";
      else newErrors.password = "";
    }

    setErrors(newErrors);
  }
  return (
    <div className='flex items-center justify-center bg-gray-50 px-5 py-12'>
      <div className='max-w-xl w-full bg-white py-5 px-5 border shadow-sm rounded-xl space-y-8'>
        <div>
          <h2 className='text-center text-3xl font-bold tracking-tight text-gray-900 pb-1'>
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back. Please enter your details to access your orders and subscriptions.
          </p>
        </div>

        <form onSubmit={onSubmit} className='mt-8 space-y-6'>
          <div className='rounded-md space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Username</label>
              <input
                type="text"
                className='block w-full rounded-md border-0 py-2.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:line-height-6'
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                onBlur={() => errorMsgs("username")}
              />
              {errors.username && touched.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <input
                type="password"
                className='block w-full rounded-md border-0 py-2.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:line-height-6'
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onBlur={() => errorMsgs("password")}
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <label className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            <div className="text-sm">
              <Link to="/resetpassword" font-medium className="text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              className='flex w-full justify-center rounded-md bg-[#0d6efd] px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-700 transition-colors duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed'
              disabled={!validForm()}
            >
              Sign in
            </button>

          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6">
              <span className="bg-white px-4 text-gray-400">OR</span>
            </div>
          </div>

          <div>
            <Link
              to="/signup"
              className="flex w-full justify-center rounded-md bg-gray-100 px-3 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 transition-colors duration-300 ease-in-out"
            >
              Create a new account
            </Link>
          </div>
        </form>

        <p className="mt-10 text-center text-xs text-gray-500">
          By signing in, you agree to our {''}
          <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}

export default Login