import React from 'react'
import { useNavigate } from 'react-router-dom'

const BtnPedir = ({ estilo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/pedidos', { state: estilo });
  };

  return (
    <div className="ms-auto">
      <button className="btn btn-success" onClick={handleClick}>Pedir</button>
    </div>
  )
}

export default BtnPedir