import React, { useEffect, useState } from 'react'
import authAxios from '../assets/js/authAxios'

const register = () => {

  useEffect(() => { document.title = 'Register' }, [])
  const [show, setShow] = useState(false)
  const { registerSubmit, redirect } = authAxios()
  useEffect(() => { redirect() }, [])

  return (
    <form onSubmit={registerSubmit}>
      <div className='container-fluid d-flex justify-content-center align-items-center vh-100' id='authContainer'>
        <div className="card rounded-0 d-flex flex-column gap-3 p-3 p-md-5">
          <h1 className='text-success py-3 text-center'>Register</h1>
          <input className='form-control p-3' type="text" name="username" placeholder='Enter username...' />
          <input className='form-control p-3' type={show ? 'text' : 'password'} name="password" placeholder='Enter password...' />
          <div className="form-check">
            <input className="form-check-input" type="checkbox" onClick={() => setShow(!show)} id="flexCheckDefault" />
            <label className="form-check-label">
              Show Password
            </label>
          </div>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-success px-3'>Sign Up</button>
          </div>
          <a className='text-center' href="/login">Already Have An Account?</a>
        </div>
      </div>
    </form>
  )
}

export default register