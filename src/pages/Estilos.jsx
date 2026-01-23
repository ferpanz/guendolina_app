import { useState, useEffect } from 'react'
import CardEstilo from '../components/CardEstilo'

const Estilos = () => {
  const [estilos, setEstilos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/styles')
      .then(res => res.json())
      .then(data => {
        // Mapear columnas de MySQL a propiedades esperadas
        const estilosFormateados = data.map(estilo => ({
          id: estilo.id,
          imagen: estilo.image,
          titulo: estilo['name-style'],
          descripcion: estilo.description,
          mostrarBtn: estilo.status === 1
        }))
        setEstilos(estilosFormateados)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError('Error al cargar los estilos')
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center mt-5">Cargando estilos...</div>
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>

  return (
    <div className="container">
      <h1 className="text-center mt-1 mb-3">Nuestros Estilos</h1>
      <div className="row justify-content-center">
        {estilos.map((estilo) => (
          <div className="col-12 col-md-6 mb-2" key={estilo.id}>
            <CardEstilo {...estilo} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Estilos
