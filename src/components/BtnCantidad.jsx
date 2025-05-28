import React from 'react'

const BtnCantidad = ({ cantidad, setCantidad }) => {
  const agregar = () => setCantidad(cantidad + 1)
  const quitar = () => {
    if (cantidad > 0) setCantidad(cantidad - 1)
  }

  return (
    <div className="d-flex align-items-center justify-content-center gap-2">
      <button
        className="btn btn-danger btn-sm"
        onClick={quitar}
        disabled={cantidad === 0}
      >-</button>
      <span className="fw-bold">{cantidad}</span>
      <button
        className="btn btn-success btn-sm"
        onClick={agregar}
      >+</button>
    </div>
  )
}

export default BtnCantidad