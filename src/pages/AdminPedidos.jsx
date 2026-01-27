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

  if (loading) {
    return <div className="text-center mt-5">Cargando pedidos...</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Administración de Pedidos</h1>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Pedidos Realizados</h5>
          
          {pedidos.length === 0 ? (
            <div className="text-center text-muted py-5">
              <p>No hay pedidos registrados</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Usuario ID</th>
                    <th>Detalles</th>
                    <th>Total</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidos.map(pedido => (
                    <tr key={pedido.id_pedido}>
                      <td><strong>#{pedido.id_pedido}</strong></td>
                      <td>{pedido.usuario_id}</td>
                      <td>
                        <small>{pedido.detalles?.substring(0, 50)}...</small>
                      </td>
                      <td className="fw-bold">${pedido.total}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={pedido.estado}
                          onChange={(e) => handleActualizarEstado(pedido.id_pedido, e.target.value)}
                        >
                          <option value="pendiente">Pendiente</option>
                          <option value="confirmado">Confirmado</option>
                          <option value="enviado">Enviado</option>
                          <option value="entregado">Entregado</option>
                          <option value="cancelado">Cancelado</option>
                        </select>
                      </td>
                      <td>
                        <small>
                          {pedido.fecha_pedido 
                            ? new Date(pedido.fecha_pedido).toLocaleDateString('es-ES')
                            : '-'
                          }
                        </small>
                      </td>
                      <td>
                        <button
                          onClick={() => handleMarcarEntregado(pedido.id_pedido)}
                          className="btn btn-sm btn-success me-2"
                        >
                          ✓ Entregar
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('¿Eliminar este pedido?')) {
                              handleMarcarEntregado(pedido.id_pedido);
                            }
                          }}
                          className="btn btn-sm btn-danger"
                        >
                          🗑
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPedidos;
