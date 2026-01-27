import { useState, useEffect } from 'react';

const AdminPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/pedidos');
      const data = await res.json();
      setPedidos(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleMarcarEntregado = async (id) => {
    if (confirm('¿Marcar este pedido como entregado y eliminarlo?')) {
      try {
        await fetch(`http://localhost:5000/api/pedidos/${id}`, { 
          method: 'DELETE' 
        });
        fetchPedidos();
      } catch (error) {
        console.error(error);
        alert('Error al eliminar el pedido');
      }
    }
  };

  const handleActualizarEstado = async (id, nuevoEstado) => {
    try {
      await fetch(`http://localhost:5000/api/pedidos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      fetchPedidos();
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el pedido');
    }
  };

  const parseDetalles = (detallesJSON) => {
    try {
      return JSON.parse(detallesJSON);
    } catch (error) {
      return [];
    }
  };

  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: 'warning',
      confirmado: 'info',
      enviado: 'primary',
      entregado: 'success',
      cancelado: 'danger'
    };
    return colores[estado] || 'secondary';
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando pedidos...</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Administración de Pedidos</h1>

      {pedidos.length === 0 ? (
        <div className="text-center text-muted py-5">
          <p>No hay pedidos registrados</p>
        </div>
      ) : (
        <div className="row">
          {pedidos.map(pedido => {
            const detalles = parseDetalles(pedido.detalles);
            return (
              <div className="col-12 col-md-6 col-lg-4 mb-4" key={pedido.id_pedido}>
                <div className="card h-100 shadow-sm border-0">
                  {/* Header con nombre del cliente */}
                  <div className={`card-header bg-${getEstadoColor(pedido.estado)} text-white d-flex justify-content-between align-items-center`}>
                    <div>
                      <h5 className="mb-1">{pedido.nombre_usuario || 'Cliente'}</h5>
                      <small>{new Date(pedido.fecha_pedido).toLocaleDateString('es-ES')}</small>
                    </div>
                  </div>

                  {/* Body con imágenes de estilos */}
                  <div className="card-body">
                    <div className="mb-3">
                      <h6 className="text-muted mb-2">Estilos Pedidos:</h6>
                      <div className="row g-2">
                        {detalles.map((estilo, idx) => (
                          <div key={idx} className="col-12">
                            <div className="d-flex gap-2">
                              <img 
                                src={estilo.imagen} 
                                alt={estilo.titulo}
                                style={{width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px'}}
                              />
                              <div className="flex-grow-1">
                                <strong className="d-block">{estilo.titulo}</strong>
                                <small className="text-muted">
                                  {estilo.barriles?.map((b, i) => (
                                    <div key={i}>{b.titulo}: {b.cantidad} uni{b.cantidad > 1 ? 'dades' : 'dad'}</div>
                                  ))}
                                </small>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <hr />

                    {/* Info del pedido */}
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Total:</span>
                        <strong className="text-success">${pedido.total}</strong>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Estado:</span>
                        <select
                          className="form-select form-select-sm"
                          style={{width: 'auto'}}
                          value={pedido.estado}
                          onChange={(e) => handleActualizarEstado(pedido.id_pedido, e.target.value)}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="confirmado">Confirmado</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </div>
                    </div>

                    {/* Botones de acciones */}
                    <div className="d-grid gap-2 mt-3">
                      <button
                        onClick={() => handleMarcarEntregado(pedido.id_pedido)}
                        className="btn btn-success btn-sm"
                      >
                        ✓ Marcar como Entregado
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('¿Eliminar este pedido?')) {
                            handleMarcarEntregado(pedido.id_pedido);
                          }
                        }}
                        className="btn btn-danger btn-sm"
                      >
                        🗑 Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminPedidos;
