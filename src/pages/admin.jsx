import React, { useEffect, useState } from 'react'
import { AdminNavbar } from '../components'
import adminAuth from '../assets/js/adminAuth'

const admin = () => {

  useEffect(() => { document.title = 'Admin' }, [])
  const [user, setUser] = useState([]);
  adminAuth(setUser);

  return (
    <>
      <AdminNavbar role={user.role}/>
      <div className="right right-active" id='container-box'>
        <div className="container py-3">
        </div>
      </div>
    </>
  )
}

export default admin