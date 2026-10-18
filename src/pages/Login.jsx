import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/organisms/LoginForm';

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario === 'admin' && password === 'admin123') {
      sessionStorage.setItem('usuario', usuario);
      sessionStorage.setItem('rol', 'admin');

      navigate('/products');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioEncontrado = usuarios.find(
      (item) =>
        item.username === usuario &&
        item.password === password
    );

    if (usuarioEncontrado) {
      sessionStorage.setItem('usuario', usuario);
      sessionStorage.setItem('rol', 'usuario');

      navigate('/products');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  const volver = () => {
    navigate('/');
  };

  return (
    <Container className="my-5 scp-page">
      <h1>Iniciar sesión</h1>

      <LoginForm
        usuario={usuario}
        password={password}
        setUsuario={setUsuario}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        volver={volver}
      />
    </Container>
  );
}

export default Login;