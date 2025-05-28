import React from 'react'
import { useNavigate } from 'react-router-dom'

const BtnCarritoConfirm = () => {
    const navigate = useNavigate()
  return (
    <div className='container col-12 col-md-6 d-flex justify-content-evenly mt-3 mt-md-5 mb-2'>
      <button className='btn btn-warning' onClick={() => navigate('/')}>Agregar estilos</button>
      <button className='btn btn-success'>Confirmar pedido</button>
    </div>
  )
}

export default BtnCarritoConfirm
