import React from 'react'
import BtnPedir from './BtnPedir'

const CardEstilo = ({ imagen, titulo, descripcion, mostrarBtn }) => {
  const estilo = { imagen, titulo, descripcion };

  return (
    <div className="card h-100 bg-success-subtle">
      <div className="row g-0 align-items-center flex-nowrap">
        <div className="col-auto">
          <img src={imagen} className="img-fluid rounded-start" alt={titulo} style={{ width: 100, height: 100, objectFit: 'cover' }} />
        </div>
        <div className="col ps-3 d-flex flex-column flex-grow-1 align-content-center">
          <div>
            <h5 className="card-title mb-1 text-center">{titulo}</h5>
            <p className="card-text mb-2">{descripcion}</p>
          </div>
          {mostrarBtn && <BtnPedir estilo={estilo} />}
        </div>
      </div>
    </div>
  )
}

export default CardEstilo