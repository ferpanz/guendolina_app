import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import GU from '../assets/Gu.png'
import horizontal from '../assets/horizontal.png'

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='bg-success rounded-bottom-4 text-white p-2 p-md-3 sticky-top'>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center justify-content-center">
            <img
              src={GU}
              alt="Logo"
              style={{ width: 'auto', height: '60px' }}
              className="img-fluid"
            />
            <img
              src={horizontal}
              alt="Logo"
              style={{ width: 'auto', height: '50px' }}
              className="img-fluid d-sm-inline"
            />
          </div>
          
          {user && (
            <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
              <span className="me-2">
                <small className="d-none d-sm-inline">{user.name}</small>
                <small className="d-sm-none">{user.name.substring(0, 8)}</small>
              </span>
              <button 
                onClick={handleLogout}
                className='btn btn-sm btn-outline-light'
              >
                <i className="bi bi-box-arrow-right"></i>
                <span className="d-none d-sm-inline ms-1">Salir</span>
              </button>
            </div>
          )}
        </div>      </div>
    </div>
  )
}

export default Header