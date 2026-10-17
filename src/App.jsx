import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Store from './pages/Store';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Register from './pages/Register';
import ProtectedRoute from './components/templates/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProtectedRoute><Products /> </ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /> </ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/store" element={<ProtectedRoute><Store /> </ProtectedRoute >} />
        <Route path="/admin" element={<ProtectedRoute rolPermitido="admin"><Admin /> </ProtectedRoute >} />
      </Routes>
    </>
  );
}

export default App;