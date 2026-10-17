import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, rolPermitido }) {
  const usuario = sessionStorage.getItem('usuario');
  const rol = sessionStorage.getItem('rol');

  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  if (rolPermitido && rol !== rolPermitido) {
    return <Navigate to="/store" replace />;
  }

  return children;
}

export default ProtectedRoute;