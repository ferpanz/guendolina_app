import { NavLink } from 'react-router-dom'

const AdminNavBar = () => {
  return (
    <div className="container bg-success text-white p-3 text-center rounded-top-4 fixed-bottom">
      <div className="d-flex justify-content-evenly flex-nowrap">
        <NavLink to='/admin-pedidos' className='btn btn-outline-light btn-sm'><i className='bi bi-cart-check'></i> Pedidos</NavLink>
        <NavLink to='/admin-pedidos/styles' className='btn btn-outline-light btn-sm'><i className="bi bi bi-house-gear"></i> Estilos</NavLink>
        <NavLink to='/admin-pedidos/clientes' className='btn btn-outline-light btn-sm'><i className="bi bi-people"></i> Clientes</NavLink>
      </div>
    </div>
  )
}

export default AdminNavBar
