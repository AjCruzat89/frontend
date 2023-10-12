import React, { useEffect } from 'react'
import { Navbar } from '../components'
import '../assets/css/home.css'
import { Spinner } from '../components'
import Auth from '../assets/js/auth.js'

const home = () => {
  useEffect(() => {
    document.title = 'Home';

    setTimeout(() => {
      const loader = document.querySelector('.spinnerContainer');
      loader.style.display = 'none';
    }, 1000);
    
  }, []);

  useEffect(() => {
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', () => {
      localStorage.removeItem('token');
      location.reload();
    })
  }, [])

  const {user, fetchUser} = Auth();

  return (
    <div>
      <Spinner></Spinner>
      <Navbar></Navbar>
      <h1>{user.username}</h1>
      <button id='logout'>Logout</button>
    </div>
  )
}

export default home