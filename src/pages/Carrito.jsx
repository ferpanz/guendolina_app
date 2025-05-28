import React from 'react'
import { useCarrito } from '../context/CarritoContext'
import CardCarrito from '../components/CardCarrito'

const Carrito = () => {
  const { carrito } = useCarrito()

  return (
    <div className="container">
      <h1 className="text-center mt-3 mb-3">Este es tu pedido</h1>
      {carrito.length === 0 ? (
        <div className="row justify-content-center">
          <h3 className="col-12 col-md-6 text-center rounded-pill bg-info mt-5 p-3 mx-auto">
            No hay pedidos en el carrito.
          </h3>
        </div>
      ) : (
        <div className="row">
          {carrito.map((pedido, id) => (
            <div className="col-12 col-md-6 mb-2" key={id}>
              <CardCarrito {...pedido} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Carrito