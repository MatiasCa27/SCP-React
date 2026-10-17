import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function Register() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuarios.some((u) => u.usuario === usuario || usuario === 'admin');

    if (existe) {
      alert('Este usuario ya existe');
      return;
    }

    const nuevoUsuario = {
      usuario: usuario,
      password: password
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente');
    navigate('/login');
  };

  return (
    <Container className="my-5">
      <h1>Registrarse</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese una contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">
          Registrarse
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

export default Register;
