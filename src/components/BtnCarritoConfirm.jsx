import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { useAuth } from '../context/AuthContext'

const BtnCarritoConfirm = () => {
  const navigate = useNavigate()
  const { carrito, setCarrito } = useCarrito()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const calcularTotal = () => {
    // Precio por barril (ejemplo: $100 por barril)
    const precioPorBarril = 100
    return carrito.reduce((total, pedido) => {
      const cantidadBarriles = pedido.barriles.reduce((sum, b) => sum + b.cantidad, 0)
      return total + (cantidadBarriles * precioPorBarril)
    }, 0)
  }

  const handleConfirmarPedido = async () => {
    if (!user) {
      alert('Debes estar autenticado para realizar un pedido')
      navigate('/login')
      return
    }

    setLoading(true)
    try {
      const total = calcularTotal()
      const detalles = JSON.stringify(carrito)

      console.log('Enviando pedido:', {
        usuario_id: user.id,
        detalles: detalles,
        total: total,
        estado: 'pendiente'
      })

      const res = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario_id: user.id,
          detalles: detalles,
          total: total,
          estado: 'pendiente'
        })
      })

      const data = await res.json()
      console.log('Respuesta del servidor:', data)

      if (!res.ok) {
        throw new Error(data.details || data.error || 'Error al crear el pedido')
      }

      alert('¡Pedido realizado exitosamente!')
      setCarrito([])
      navigate('/')
    } catch (error) {
      console.error('Error:', error)
      alert('Error al confirmar el pedido: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container col-12 col-md-6 d-flex justify-content-evenly mt-3 mt-md-5 mb-2'>
      <button className='btn btn-warning' onClick={() => navigate('/')}>Agregar estilos</button>
      <button 
        className='btn btn-success' 
        onClick={handleConfirmarPedido}
        disabled={loading}
      >
        {loading ? 'Confirmando...' : 'Confirmar pedido'}
      </button>
    </div>
  )
}

export default BtnCarritoConfirm
