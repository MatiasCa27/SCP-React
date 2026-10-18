import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/organisms/AuthForm';

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

    let usuarios;

    try {
      const datos = JSON.parse(localStorage.getItem('usuarios'));
      usuarios = Array.isArray(datos) ? datos : [];
    } catch {
      usuarios = [];
    }

    const usuarioEncontrado = usuarios.find((item) => {
      const nombreGuardado = item?.username ?? item?.usuario;
      return nombreGuardado === usuario && item?.password === password;
    });

    if (usuarioEncontrado) {
      sessionStorage.setItem('usuario', usuario);
      sessionStorage.setItem('rol', 'usuario');
      navigate('/products');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <Container className="my-5 scp-page">
      <h1>Iniciar sesión</h1>
      <AuthForm
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