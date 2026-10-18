import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from '../atoms/Button';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const rol = sessionStorage.getItem('rol');

  const cerrarSesion = () => {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('rol');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/products">Insurgencia del Caos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            {rol === 'admin' && <Nav.Link as={Link} to="/admin">Administración</Nav.Link>}
          </Nav>
          <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesión</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;