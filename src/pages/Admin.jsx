import { useState, useEffect } from 'react';

const Admin = () => {
  const [styles, setStyles] = useState([]);
  const [formData, setFormData] = useState({
    'name-style': '',
    description: '',
    image: '',
    status: 1
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    fetchStyles();
  }, []);

  const fetchStyles = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/styles');
      const data = await res.json();
      setStyles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'status' ? parseInt(value) : name === 'name-style' ? value.toUpperCase() : value
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    const formDataFile = new FormData();
    formDataFile.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload/upload', {
        method: 'POST',
        body: formDataFile
      });

      if (!res.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await res.json();
      setFormData({
        ...formData,
        image: data.filename
      });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploadError(error.message);
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingId 
        ? `http://localhost:5000/api/styles/${editingId}`
        : 'http://localhost:5000/api/styles';
      
      const method = editingId ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setFormData({ 'name-style': '', description: '', image: '', status: 1 });
      setEditingId(null);
      fetchStyles();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (style) => {
    setFormData({
      'name-style': style['name-style'],
      description: style.description,
      image: style.image,
      status: style.status
    });
    setEditingId(style.id);
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar este estilo?')) {
      try {
        await fetch(`http://localhost:5000/api/styles/${id}`, { method: 'DELETE' });
        fetchStyles();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ 'name-style': '', description: '', image: '', status: 1 });
    setUploadError(null);
  };

  return (
    <div className="container mt-3 mb-3">
      <h1 className="mb-4">Administración de Estilos</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{editingId ? 'Editar' : 'Crear'} Estilo</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Estilo</label>
              <input 
                type="text" 
                name="name-style" 
                placeholder="Ej: BLONDE ALE" 
                value={formData['name-style']} 
                onChange={handleInputChange} 
                required 
                className="form-control" 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea 
                name="description" 
                placeholder="Descripción del estilo" 
                value={formData.description} 
                onChange={handleInputChange} 
                required 
                className="form-control" 
                rows="3"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Imagen</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="form-control" 
              />
              {uploading && <small className="text-muted">Subiendo...</small>}
              {uploadError && <small className="text-danger">{uploadError}</small>}
              {formData.image && (
                <div className="mt-2">
                  <small className="text-success">✓ {formData.image}</small>
                </div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleInputChange} 
                className="form-control"
              >
                <option value={1}>Activo</option>
                <option value={0}>Inactivo</option>
              </select>
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
          <h5 className="card-title">Estilos Registrados</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Imagen</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {styles.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No hay estilos registrados
                    </td>
                  </tr>
                ) : (
                  styles.map(style => (
                    <tr key={style.id}>
                      <td>{style.id}</td>
                      <td><strong>{style['name-style']}</strong></td>
                      <td>{style.description.substring(0, 50)}...</td>
                      <td>{style.image}</td>
                      <td>
                        <span className={`badge ${style.status ? 'bg-success' : 'bg-danger'}`}>
                          {style.status ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => handleEdit(style)} 
                          className="btn btn-sm btn-warning me-2"
                        >
                          Editar
                        </button>
                        <button 
                          onClick={() => handleDelete(style.id)} 
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

export default Admin;
