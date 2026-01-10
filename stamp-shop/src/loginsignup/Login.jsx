import React from 'react'

function Login() {
  const [form, setForm] = React.useState({
    login: "",
    password: ""
  })

  const onSubmit = (e) => {
    e.preventDefault();
    alert("Logged in successfully!");
    console.log(form);
  }
  const validForm = () => {
    return form.login && form.password;
  }
  return (
    <div className='' style={{ margin: '-4.5rem' }}>
      <div className='row justify-content-center align-items-center min-vh-100'>
        <div className='col-12 col-sm-10 col-md-6 col-lg-4'>
          <h2 className='text-center mb-4'>Login to your account</h2>

      <form onSubmit={onSubmit} className='p-4 bg-white border rounded'>

        <div className='mb-3'>
          <label className='form-label'>Login</label>
          <input type="text" className='form-control' value={form.login} onChange={(e)=> setForm({...form,login:e.target.value})}/>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input type="password" className='form-control' value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/>
        </div>
        <div>
          <button className='btn btn-dark w-100 mt-2' disabled={!validForm()}>Login</button>
        </div>
      </form>
        </div>
      </div>
    </div>
  )
}

export default Login