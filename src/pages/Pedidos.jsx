import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CardEstilo from '../components/CardEstilo'
import CardBarril from '../components/CardBarril'
import barril15 from '../assets/barril15.jpg'
import barril30 from '../assets/barril30.jpg'
import barril50 from '../assets/barril50.jpg'

const barriles = [
  { id: 1, imagen: barril15, titulo: 'Barril 15L' },
  { id: 2, imagen: barril30, titulo: 'Barril 30L' },
  { id: 3, imagen: barril50, titulo: 'Barril 50L' },
]

const Pedidos = () => {
  const { state } = useLocation();
  const [cantidades, setCantidades] = useState([0, 0, 0]);

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

  const botonSumar = id => {
    setCantidades(cantidades.map((c, i) => i === id ? c + 1 : c));
  };

  const botonRestar = id => {
    setCantidades(cantidades.map((c, i) => i === id && c > 0 ? c - 1 : c));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-1 mb-3">Estilo selecionado</h1>
      <div className='row justify-content-center'>
        <div className='col-12 col-md-6 mb-2'>
          <CardEstilo
            imagen={state.imagen}
            titulo={state.titulo}
            mostrarBtn={false}
          />
        </div>
      </div>
      <h2 className="text-center mt-1 mb-2">Selecciona los barriles</h2>
      <div className="row justify-content-center">
        {barriles.map((barril, id) => (
          <div className="col-12 col-md-4 mb-2" key={barril.id}>
            <CardBarril
              imagen={barril.imagen}
              titulo={barril.titulo}
              cantidad={cantidades[id]}
              sumar={() => botonSumar(id)}
              restar={() => botonRestar(id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pedidos