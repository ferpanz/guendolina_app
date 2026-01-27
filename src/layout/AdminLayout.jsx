import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import AdminNavBar from '../components/AdminNavBar'

const AdminLayout = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      
      <div className="container mt-4">
        <Outlet />
      </div>
      <AdminNavBar />
    </div>
  )
}

export default AdminLayout
