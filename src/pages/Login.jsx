import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GU from '../assets/Gu.png'
import horizontal from '../assets/horizontal.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-success-subtle">
      <div className="card shadow-lg bg-success" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body p-5">
          <div className="d-flex align-items-center justify-content-center">
                      <img
                        src={GU}
                        alt="Logo"
                        style={{ width: 'auto', height: '80px', marginRight: '5px' }}
                        className="img-fluid"
                      />
                      <img
                        src={horizontal}
                        alt="Logo"
                        style={{ width: 'auto', height: '70px' }}
                        className="img-fluid  d-sm-inline"
                      />
                    </div>
          <h5 className="text-center mt-3 mb-4 text-muted">Iniciar Sesión</h5>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
              ></button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tu@email.com"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Tu contraseña"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mt-4"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
};

export default Login;
