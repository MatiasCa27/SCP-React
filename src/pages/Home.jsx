import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

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
      </div>
    </Container>
  );
}

export default Home;