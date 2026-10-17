import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Admin() {
  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <h1>Panel de Administración</h1>

      <p>Bienvenido al panel de administración de SCP.</p>

      <Button onClick={() => navigate('/store')}>
        Volver a la tienda
      </Button>
    </Container>
  );
}

export default Admin;