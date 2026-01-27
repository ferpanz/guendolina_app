import { useState, useEffect } from 'react';

const AdminClientes = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    'user-name': '',
    email: '',
    password: '',
    admin: false
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users');
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : name === 'user-name' ? value.toUpperCase() : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editingId && !formData.password) {
      alert('La contraseña es requerida para nuevos usuarios');
      return;
    }

    try {
      const url = editingId 
        ? `http://localhost:5000/api/users/${editingId}`
        : 'http://localhost:5000/api/users';
      
      const method = editingId ? 'PUT' : 'POST';

      const dataToSend = editingId 
        ? { 'user-name': formData['user-name'], email: formData.email, admin: formData.admin }
        : formData;
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend)
      });
      
      setFormData({ 'user-name': '', email: '', password: '', admin: false });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert('Error al guardar el usuario');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      'user-name': user['user-name'],
      email: user.email,
      password: '',
      admin: user.admin === 1
    });
    setEditingId(user.idusers);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este usuario?')) {
      try {
        await fetch(`http://localhost:5000/api/users/${id}`, { method: 'DELETE' });
        fetchUsers();
      } catch (error) {
        console.error(error);
        alert('Error al eliminar el usuario');
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ 'user-name': '', email: '', password: '', admin: false });
  };

  if (loading) {
    return <div className="text-center mt-5">Cargando clientes...</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <h1 className="mb-4">Administración de Clientes</h1>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{editingId ? 'Editar' : 'Crear'} Cliente</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="user-name"
                placeholder="Nombre completo"
                value={formData['user-name']}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                placeholder="correo@ejemplo.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                {editingId ? 'Nueva Contraseña (dejar en blanco para no cambiar)' : 'Contraseña'}
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!editingId}
                  className="form-control"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️‍🗨️' : '🔒'}
                </button>
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                name="admin"
                checked={formData.admin}
                onChange={handleInputChange}
                className="form-check-input"
                id="adminCheck"
              />
              <label className="form-check-label" htmlFor="adminCheck">
                Es administrador
              </label>
            </div>

            <div>
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary ms-2"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Clientes Registrados</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No hay clientes registrados
                    </td>
                  </tr>
                ) : (
                  users.map(user => (
                    <tr key={user.idusers}>
                      <td>{user.idusers}</td>
                      <td><strong>{user['user-name']}</strong></td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`badge ${user.admin ? 'bg-danger' : 'bg-info'}`}>
                          {user.admin ? 'Admin' : 'Cliente'}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-sm btn-warning me-2"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(user.idusers)}
                          className="btn btn-sm btn-danger"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClientes;
