import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import RegisterForm from '../components/organisms/RegisterForm';

function Register() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombreUsuario = usuario.trim();

    if (!nombreUsuario) {
      alert('Ingrese un nombre de usuario válido');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuarios.some((u) => u.usuario === nombreUsuario) || nombreUsuario === 'admin';

    if (existe) {
      alert('Este usuario ya existe');
      return;
    }

    const nuevoUsuario = {
      usuario: nombreUsuario,
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
      <RegisterForm
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

export default Register;