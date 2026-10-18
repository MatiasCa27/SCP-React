import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="my-5 text-center scp-page">
      <h1>Insurgencia del Caos</h1>

      <Button onClick={() => navigate('/login')}>
        Iniciar sesión
      </Button>

      {' '}

      <Button onClick={() => navigate('/register')}>
        Registrarse
      </Button>
    </Container>
  );
}

export default Home;