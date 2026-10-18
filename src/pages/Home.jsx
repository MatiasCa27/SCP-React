import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';
import Header from '../components/organisms/Header';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Container className="my-5 text-center scp-page">
        <Image
          src="/images/logo.webp"
          alt="Logo de la Insurgencia del Caos"
          className="scp-home-logo"
        />

        <h1>Insurgencia del Caos</h1>

        <Button onClick={() => navigate('/login')}>
          Iniciar sesión
        </Button>

        {' '}

        <Button onClick={() => navigate('/register')}>
          Registrarse
        </Button>
      </Container>
    </>
  );
}

export default Home;