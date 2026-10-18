import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/organisms/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/templates/ProtectedRoute';

function App() {
  const location = useLocation();

  return (
    <>
      {!['/', '/login', '/register'].includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
        <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;