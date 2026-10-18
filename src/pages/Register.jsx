import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/organisms/AuthForm';

function Register() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombreUsuario = usuario.trim();

    if (!nombreUsuario || !password.trim()) {
      alert('Completa todos los campos');
      return;
    }

    let usuarios;

    try {
      const datos = JSON.parse(localStorage.getItem('usuarios'));
      usuarios = Array.isArray(datos) ? datos : [];
    } catch {
      usuarios = [];
    }

    const existeUsuario = nombreUsuario.toLowerCase() === 'admin' ||
      usuarios.some((item) => {
        const nombreGuardado = item?.username ?? item?.usuario;
        return typeof nombreGuardado === 'string' &&
          nombreGuardado.toLowerCase() === nombreUsuario.toLowerCase();
      });

    if (existeUsuario) {
      alert('El nombre de usuario ya existe');
      return;
    }

    usuarios.push({ username: nombreUsuario, password });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente');
    navigate('/login');
  };

  return (
    <Container className="my-5 scp-page">
      <h1>Registrarse</h1>
      <AuthForm
        usuario={usuario}
        password={password}
        setUsuario={setUsuario}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        volver={() => navigate('/')}
        registro
      />
    </Container>
  );
}

export default Register;