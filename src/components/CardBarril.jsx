import React from 'react'

const CardBarril = ({ imagen, titulo, cantidad, onSumar, onRestar }) => {
  return (
    <div className="card h-100 mb-2">
      <div className="row g-0 align-items-center flex-nowrap">
        <div className="col-auto">
          <img src={imagen} className="img-fluid rounded-start" alt={titulo} style={{ width: 80, height: 80, objectFit: 'cover' }} />
        </div>
        <div className="col ps-3 d-flex flex-column flex-grow-1 align-content-center">
          <h5 className="card-title mb-1 text-center">{titulo}</h5>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <button className="btn btn-danger btn-sm" onClick={onRestar} disabled={cantidad === 0}>-</button>
            <span className="fw-bold">{cantidad}</span>
            <button className="btn btn-success btn-sm" onClick={onSumar}>+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardBarril