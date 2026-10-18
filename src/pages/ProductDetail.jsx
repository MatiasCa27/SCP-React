import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Image from '../components/atoms/Image';
import CardBody from '../components/molecules/CardBody';
import { obtenerProductos } from '../utils/productUtils';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();

  const productos = obtenerProductos();

  const producto = productos.find(
    (product) => product.id === Number(id)
  );

  if (!producto) {
    return (
      <Container className="my-5 scp-page">
        <h1>Producto no encontrado</h1>
      </Container>
    );
  }

  return (
    <Container className="my-5 scp-page">
      <h1>Detalle del SCP</h1>

      <div className="scp-detail">
        <Image
          src={producto.image}
          alt={producto.name}
          className="scp-detail-image"
        />

        <div className="scp-detail-info">
          <CardBody
            title={producto.name}
            description={producto.longDescription || producto.description}
            price={producto.price}
            stock={producto.stock}
          />
        </div>
      </div>
    </Container>
  );
}

export default ProductDetail;