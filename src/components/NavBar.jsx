import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="container bg-success text-white p-3 text-center rounded-top-4 fixed-bottom">
      <div className="d-flex justify-content-evenly flex-nowrap">
        <NavLink to='/' className='btn btn-outline-light'><i className='bi bi-house'></i> Estilos</NavLink>
        <NavLink to='/pedidos' className='btn btn-outline-light'><i className="bi bi-card-checklist"></i> Pedidos</NavLink>
        <NavLink to='/carrito' className='btn btn-outline-light'><i className="bi bi-cart"></i> Carrito</NavLink>
      </div>
    </div>
  )
}

export default NavBar
