import React from 'react'
import BtnCantidad from './BtnCantidad'

const CardBarril = ({ imagen, titulo, cantidad, setCantidad }) => {
  return (
    <div className="card h-100 mb-2">
      <div className="row g-0 align-items-center flex-nowrap">
        <div className="col-auto">
          <img src={imagen} className="img-fluid rounded-start" alt={titulo} style={{ width: 80, height: 80, objectFit: 'cover' }} />
        </div>
        <div className="col ps-3 d-flex flex-column flex-grow-1 align-content-center">
          <h5 className="card-title mb-1 text-center">{titulo}</h5>
          <BtnCantidad cantidad={cantidad} setCantidad={setCantidad} />
        </div>
      </div>
    </div>
  )
}

export default CardBarril