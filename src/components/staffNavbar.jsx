import React, { useState } from 'react'
import { LogoutButton } from '.';

const staffNavbar = (props) => {

  const toggle = () => {
    document.getElementById('container-box').classList.toggle('right-active');
    document.querySelector('.sidebar').classList.toggle('d-md-flex');
    if (screen.width < 768) {
      document.querySelector('.sidebar').classList.toggle('d-none');
    }
  }

  window.addEventListener('resize', () => {
    if (screen.width > 768) {
      document.querySelector('.sidebar').classList.remove('d-none');
      document.querySelector('.sidebar').classList.add('d-none');
    }
  })

  return (
    <>
      <nav className='navbar fixed-top bg-success px-2 text-white'>
        <i onClick={toggle} className="bi bi-list"></i>
      </nav>
      <div className="sidebar d-none d-md-flex flex-column position-fixed px-2 py-3 border h-100 bg-white">
        <div className="d-flex justify-content-center">
          <img onClick={() => window.location.reload()} src="/bcas.png" alt="logo" id='logo' />
        </div>
        <div className='w-100 p-2 rounded'>
          <LogoutButton />
        </div>
      </div>
    </>
  )
}

export default staffNavbar