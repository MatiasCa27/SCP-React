import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="home-container">
      <div className="home-logo">
        <h1>Insurgencia del Caos</h1>
      </div>

      <div className="home-buttons">
        <Button onClick={() => navigate('/login')}>
          Log In
        </Button>

        <Button onClick={() => navigate('/register')}>
          Register
        </Button>

        <Button onClick={() => navigate('/store')}>
          Ingresar como Invitado
        </Button>
      </div>
    </Container>
  );
}

export default Home;