import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/organisms/RegisterForm';

function Register() {
  const navigate = useNavigate();

  const handleRegister = (username, password) => {
    const nombreUsuario = username.trim();

    if (!nombreUsuario || !password) {
      alert('Completa todos los campos');
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const existeUsuario =
      nombreUsuario.toLowerCase() === 'admin' ||
      usuarios.some(
        (usuario) =>
          usuario.username.toLowerCase() === nombreUsuario.toLowerCase()
      );

    if (existeUsuario) {
      alert('El nombre de usuario ya existe');
      return;
    }

    usuarios.push({
      username: nombreUsuario,
      password
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente');
    navigate('/login');
  };

  return (
    <Container className="my-5 scp-page">
      <h1>Registrarse</h1>
      <RegisterForm handleRegister={handleRegister} />
    </Container>
  );
}

export default Register;