import React,{useEffect} from 'react'
import { DashboardNavbar, DashboardSidebar } from '../components'
import '../assets/css/dashboard.css'
import adminAuth from '../assets/js/adminAuth';
import { Spinner } from '../components';

const dashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard'
  })

  useEffect(() => {
    setTimeout(() => {
      const loader = document.querySelector('.spinnerContainer');
      loader.style.display = 'none';
    }, 1000);
  }, [])

  const {user, fetchUser} = adminAuth();

  return (    
    <div>
      <div className="d-flex flex-row w-100">
        <Spinner></Spinner>
        <DashboardSidebar></DashboardSidebar>
        <div className="d-flex flex-grow-1 flex-column overflow-hidden">
          <DashboardNavbar></DashboardNavbar>
          <div className="content">
            <h1>Hello {user.username}</h1>           
          </div>
        </div>
      </div>
    </div>
  )
}

export default dashboard