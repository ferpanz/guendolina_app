import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

const BtnMasPedidos = ({ estilo, cantidades, barriles }) => {
  const navigate = useNavigate()
  const { agregarPedido } = useCarrito()

  const hayPedido = cantidades.some(c => c > 0)

  const handleAgregar = () => {
    const barrilesSeleccionados = barriles
      .map((barril, idx) => ({
        titulo: barril.titulo,
        cantidad: cantidades[idx]
      }))
      .filter(b => b.cantidad > 0)

    agregarPedido({
      imagen: estilo.imagen,
      titulo: estilo.titulo,
      barriles: barrilesSeleccionados
    })
    navigate('/carrito')
  }

  return (
    <div className='container col-12 col-md-6 d-flex justify-content-evenly mt-3 mt-md-5 mb-2'>
      <button className='btn btn-warning' onClick={() => navigate('/')}>Selecciona otro estilo</button>
      <button className='btn btn-success' onClick={handleAgregar} disabled={!hayPedido}>
        Agregar pedido al carrito
      </button>
    </div>
  )
}

export default BtnMasPedidos