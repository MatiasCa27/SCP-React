import { Container, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Image from '../components/atoms/Image';
import CardBody from '../components/molecules/CardBody';
import { obtenerProductos } from '../utils/productUtils';

function ProductDetail() {
  const { id } = useParams();
  const listaProductos = obtenerProductos();
  const product = listaProductos.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <Container className="my-5">
        <h1>Producto no encontrado</h1>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
        <Image src={product.image} alt={product.name} className="card-img-top" />
        <Card.Body>
          <CardBody title={product.name} description={product.description} price={product.price} stock={product.stock} variant="h2" />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetail;