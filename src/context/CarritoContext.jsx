import React, { createContext, useContext, useState } from 'react'

const CarritoContext = createContext()

export const useCarrito = () => useContext(CarritoContext)

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([])

  const agregarPedido = pedido => setCarrito([...carrito, pedido])

  const eliminarPedido = tituloEstilo => {
    setCarrito(carrito.filter(p => p.titulo !== tituloEstilo))
  }

  return (
    <CarritoContext.Provider value={{ carrito, agregarPedido, eliminarPedido }}>
      {children}
    </CarritoContext.Provider>
  )
}