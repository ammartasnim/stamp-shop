import React from 'react'
import { Link } from 'react-router-dom';

function Resetpassword() {
  const [form, setForm] = React.useState({
      code: ""
    })
    const [email, setEmail] = React.useState("");
  
    const onSubmit = (e) => {
      e.preventDefault();
      alert("Logged in successfully!");
      console.log(form);
    }
    const validEmail = (email) => {
      return /\S+@\S+\.\S+/.test(email);
    }
    const validForm = () => {
      return form.login && form.password;
    }
    return (
      <div className='' style={{ margin: '-4.5rem' }}>
        <div className='row justify-content-center align-items-center min-vh-100'>
          <div className='col-12 col-sm-10 col-md-6 col-lg-4'>
            <h2 className='text-center mb-4'>Reset your password</h2>
  
        <form onSubmit={onSubmit} className='p-4 bg-white border rounded'>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input type="text" className='form-control' value={email} onChange={(e)=> setEmail(e.target.value)}/>
          </div>
          <button className='btn btn-dark btn-sm' style={{marginTop:'-97.5px', marginLeft:'424px'}} disabled={!validEmail(email)}>Send</button>
          <div className='mb-3'>
            <label className='form-label'>Verification code</label>
            <input type="text" className='form-control' value={form.code} onChange={(e)=> setForm({...form,code:e.target.value})}/>
          </div>
          <div>
            <button className='btn btn-dark w-100 mt-2' disabled={!validForm()}>Submit</button>
          </div>
        </form>

          
          </div>
        </div>
      </div>
    )
}

export default Resetpassword