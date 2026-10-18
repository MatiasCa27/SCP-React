import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

function AboutUs() {
  const navigate = useNavigate();
  const usuarioAutenticado = !!sessionStorage.getItem('usuario');

  const volver = () => {
    navigate(usuarioAutenticado ? '/products' : '/');
  };

  return (
    <Container className="my-5 scp-page">
      <h1>Sobre nosotros</h1>
      <p>
        En Insurgencia del Caos nos dedicamos a la comercialización de objetos anómalos,
        escasos y difíciles de encontrar. Nuestro catálogo reúne productos únicos,
        obtenidos de lugares donde pocos se atreverían a buscar.
      </p>
      <p>
        Seleccionamos cuidadosamente cada artículo para ofrecer a nuestros clientes
        acceso a objetos extraordinarios. También consideramos solicitudes especiales,
        dependiendo de la disponibilidad, el costo y los riesgos involucrados.
      </p>
      <p>Nosotros conseguimos el producto. Tú decides qué hacer con él.</p>
      <Button onClick={volver}>Volver</Button>
    </Container>
  );
}

export default AboutUs;