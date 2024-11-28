import React, { useState } from 'react'
import { LogoutButton } from '.';

const adminNavbar = (props) => {

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
          <img onClick={() => window.location.href = '/admin'} src="/bcas.png" alt="logo" id='logo' />
        </div>
        <div className='w-100 p-2 rounded mt-3'>
          <a href="/admin"><i className="bi bi-house"></i>Home</a>
        </div>
        <div className='w-100 p-2 rounded'>
          <a href="/admin/users"><i className="bi bi-people"></i>Users</a>
        </div>
        <div className='w-100 p-2 rounded'>
          <a href="/admin/windows"><i className="bi bi-layout-text-window"></i>Windows</a>
        </div>
        <div className='w-100 p-2 rounded'>
          <LogoutButton />
        </div>
      </div>
    </>
  )
}

export default adminNavbar