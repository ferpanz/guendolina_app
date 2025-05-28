import React from 'react'
import { useLocation } from 'react-router-dom'
import CardEstilo from '../components/CardEstilo'

const Pedidos = () => {
  const { state } = useLocation();

  if (!state) {
    return (
      <div
        className="container d-flex align-items-center justify-content-center"
        style={{ minHeight: '60vh' }}
      >
        <h1 className="col-12 col-md-6 rounded-pill bg-info p-5 text-center">
          No hay pedido seleccionado
        </h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-center mt-1 mb-3">Detalles del Pedido</h1>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6 mb-3'>
          <CardEstilo
            imagen={state.imagen}
            titulo={state.titulo}
            mostrarBtn={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Pedidos