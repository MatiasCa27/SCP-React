import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import AboutUs from './pages/AboutUs';
import Navbar from './components/organisms/Navbar';
import Footer from './components/organisms/Footer';
import ProtectedRoute from './components/templates/ProtectedRoute';

function App() {
  const location = useLocation();

  const usuarioAutenticado = !!sessionStorage.getItem('usuario');

  const mostrarNavbar =
    usuarioAutenticado &&
    (location.pathname.startsWith('/products') ||
      location.pathname === '/about-us');

  return (
    <div className="scp-app-layout">
      {mostrarNavbar && <Navbar />}

      <main className="scp-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>}/>
          <Route path="/products/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>}/>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;