import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Forbidden, Register, Login, Admin, Staff, Windows, WindowProcesses , Users, Kiosk, KioskProcess, Monitor } from './pages'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Forbidden />}/>
        <Route path="/"  element={<Login />}/>
        <Route path="/register"  element={<Register />}/>
        <Route path="/login"  element={<Login />}/>
        <Route path='/admin' element={<Admin />}/>
        <Route path='/staff' element={<Staff />}/>
        <Route path='/admin/windows' element={<Windows />}/>
        <Route path='/admin/users' element={<Users />}/>  
        <Route path='/admin/windows/:wname' element={<WindowProcesses />}/>
        <Route path='/kiosk' element={<Kiosk />}/>
        <Route path='/kiosk/:coding' element={<KioskProcess />}/>
        <Route path='/monitor' element={<Monitor />}/>
      </Routes> 
    </>
  )
}

export default App