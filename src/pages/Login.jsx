import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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
    navigate('/products');
  } else {
    alert('Usuario o contraseña incorrectos');
  }
};

  return (
    <Container className="my-5">
      <h1>Iniciar Sesión</h1>
      <LoginForm
        usuario={usuario}
        password={password}
        setUsuario={setUsuario}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        volver={() => navigate('/')}
      />
    </Container>
  );
}

export default Login;