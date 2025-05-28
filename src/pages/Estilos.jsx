import React from 'react'
import honey from '../assets/honey.png'
import blonde from '../assets/blonde-ale.png'
import irish from '../assets/irish-red.png'
import ipa from '../assets/session-ipa.png'
import CardEstilo from '../components/CardEstilo'

const estilos = [
  {
    id: 1,
    imagen: blonde,
    titulo: 'BLONDE ALE',
    descripcion: 'Suave y refrescante con todo el sabor de lo artesanal, hecha con los más finos ingredientes.',
    mostrarBtn: true,
  },
  {
    id:2,
    imagen: honey,
    titulo: 'IRISH RED',
    descripcion: 'Con tonos de miel y dulzura, esta cerveza es una explosión de sabor con un toque de caramelo.',
    mostrarBtn: true,
  },
  {
    id: 3,
    imagen: irish,
    titulo: 'HONEY',
    descripcion: 'Suave como BLONDE ALE con el dulzor justo que le da la miel más natural.',
    mostrarBtn: true,
  },
  {
    id: 4,
    imagen: ipa,
    titulo: 'SESSION IPA',
    descripcion: 'Trdicional y refrescante, con un amargor equilibrado y un aroma a lúpulo que te hará querer más.',
    mostrarBtn: true,
  },
  
]

const Estilos = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-1 mb-3">Nuestros Estilos</h1>
      <div className="row justify-content-center">
        {estilos.map((estilo, id) => (
          <div className="col-12 col-md-6 mb-2" key={id}>
            <CardEstilo {...estilo} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Estilos
