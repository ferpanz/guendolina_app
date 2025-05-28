import React from 'react'
import { useCarrito } from '../context/CarritoContext'

const CardCarrito = ({ imagen, titulo, barriles }) => {
  const { eliminarPedido } = useCarrito()

  return (
    <div className="card h-100 mb-2">
      <div className="row g-0 align-items-center h-100">
        <div className="col-auto">
          <img src={imagen} alt={titulo} style={{ width: 100, height: 100, objectFit: 'cover' }} />
        </div>
        <div className="col ps-3 d-flex flex-column h-100">
          <h5 className="card-title mt-1 mb-1 text-center">{titulo}</h5>
          <ul className="mb-1 ps-3 ms-5 mt-2">
            {barriles.map((b, idx) => (
              <li key={idx}>
                {b.cantidad} x {b.titulo}
              </li>
            ))}
          </ul>
          <button
            className="btn btn-sm btn-danger mt-auto ms-auto"
            onClick={() => eliminarPedido(titulo)}
          ><i class="bi bi-trash3"></i></button>
        </div>
      </div>
    </div>
  )
}

export default CardCarrito