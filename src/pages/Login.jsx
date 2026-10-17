import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();
  if (usuario === 'admin' && password === 'admin123') {
    sessionStorage.setItem('usuario', usuario);
    sessionStorage.setItem('rol', 'admin');
    navigate('/admin');
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuarios.find(
    (u) => u.usuario === usuario && u.password === password
  );

  if (usuarioEncontrado) {
    sessionStorage.setItem('usuario', usuario);
    sessionStorage.setItem('rol', 'usuario');
    navigate('/store');
  } else {
    alert('Usuario o contraseña incorrectos');
  }
};

  return (
    <Container className="my-5">
      <h1>Iniciar Sesión</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">
          Iniciar Sesión
        </Button>

        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate('/')}
        >
          Volver
        </Button>
      </Form>
    </Container>
  );
}

export default Login;