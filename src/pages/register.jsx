import React, { useEffect } from 'react';
import '../assets/css/form.css';
import { Spinner } from '../components';
import axios from 'axios';
import Swal from 'sweetalert2';

const register = () => {
  useEffect(() => {
    document.title = 'Register';

    setTimeout(() => {
      const loader = document.querySelector('.spinnerContainer');
      loader.style.display = 'none';
    }, 900);
  }, []);

  useEffect(() => {
    if(localStorage.getItem('token')){
      window.location.href = '/';
    }
  }, [])
  
  const registerSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    formData.append('username', event.target.username.value);
    formData.append('password', event.target.password.value);
    formData.append('rpassword', event.target.rpassword.value);


    axios.post('http://127.0.0.1:8000/api/register', formData)
      .then(response => {   
        Swal.fire({
          icon: 'success',
          title: 'Register Successful!',
          showCancelButton: false, 
          showConfirmButton: false 
        });
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
          showConfirmButton: false
        })
        setTimeout(() => {
          Swal.close();
        }, 1000);
      })
  }
  return (
    <div>
      <form onSubmit={registerSubmit}>
        <Spinner></Spinner>
        <div className='vh-100 vw-100 d-flex justify-content-center align-items-center p-3 p-md-0' id='boxContainer'>
          <div className="d-flex flex-column p-5 rounded" id='box'>
            <div className="d-flex py-3 justify-content-center">
              <h1>Register</h1>
            </div>
            <label className='mt-3' htmlFor="">Username</label>
            <input className='rounded p-2' type="text" name="username" id="" placeholder='Username...' required />
            <label className='mt-3' htmlFor="">Password</label>
            <input className='rounded p-2' type="password" name="password" id="" placeholder='Password...' required />
            <label className='mt-3' htmlFor="">Re-Enter Password</label>
            <input className='rounded p-2' type="password" name="rpassword" id="" placeholder='Re-Enter Password...' required />
            <div className="d-flex flex-column justify-content-center align-items-center my-3">
              <a href="/login">Already have an account? Login here...</a>
            </div>
            <div className="d-flex justify-content-center">
              <button className='rounded p-2' type='submit'>Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default register