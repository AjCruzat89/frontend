import React, { useEffect } from 'react'
import '../assets/css/dashboardSidebar.css';

const dashboardSidebar = () => {
  useEffect(() => {
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      location.reload();
    })
  }, [])
  return (
    <div className='d-none d-lg-flex flex-column vh-100 position-fixed' id='dashboardSidebar'>
      <div onClick={() => window.location.href='/dashboard'} className="d-flex px-3 px-sm-0 justify-content-between justify-content-sm-center align-items-center position-relative">
        <h1>BOOKNEST</h1>
        <i className='d-flex d-sm-none fa-solid fa-xmark mb-2'></i>
      </div>
      <a className='mt-3' href="/dashboard"><span class="material-symbols-outlined">
        monitoring
      </span>Dashboard</a>
      <a href="/users"><span class="material-symbols-outlined">
        manage_accounts
      </span>Manage Users</a>
      <a href="/books"><span class="material-symbols-outlined">
        auto_stories
      </span>Manage Books</a>
      <a className='mt-auto' href="#" id='logoutButton'><span class="material-symbols-outlined">
        logout
      </span>Logout</a>
    </div>
  )
}

export default dashboardSidebar