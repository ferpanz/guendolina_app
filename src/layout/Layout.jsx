import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import NavBar from '../components/NavBar' 

const Layout = () => {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
        <Header />
        <Outlet />
        <NavBar />
      
    </div>
  )
}

export default Layout
