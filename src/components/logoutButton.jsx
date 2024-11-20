//<!--===============================================================================================-->
import React from 'react'
import axios from 'axios'
import { authHeaders } from '../assets/js/headers'
//<!--===============================================================================================-->
const logoutButton = () => {
  
  const logoutSubmit = async (e) => {
    e.preventDefault()
    axios.post(`http://${import.meta.env.VITE_IPV4}:3000/user/logout`, {}, { headers: authHeaders, withCredentials: false })
    .then(res => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    })
    .catch(err => console.log(err))
  }

  return (
    <form onSubmit={logoutSubmit}>
    <button className='btn btn-danger py-2 px-3 mt-3' type='submit'>Logout</button>
    </form>
  )
}
//<!--===============================================================================================-->
export default logoutButton
//<!--===============================================================================================-->