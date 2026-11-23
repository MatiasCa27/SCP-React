import { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Image from '../components/atoms/Image';
import CardBody from '../components/molecules/CardBody';
import { obtenerProducto } from '../utils/productUtils';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const [resultado, setResultado] = useState({
    id: null,
    producto: null,
    cargando: true,
    error: ''
  });

  useEffect(() => {
    let activo = true;

    obtenerProducto(id)
      .then((resultado) => {
        if (activo) {
          setResultado({ id, producto: resultado, cargando: false, error: '' });
        }
      })
      .catch((requestError) => {
        if (!activo) return;
        const error = requestError.status === 404
          ? ''
          : `No se pudo cargar el SCP: ${requestError.message}`;
        setResultado({ id, producto: null, cargando: false, error });
      });

    return () => {
      activo = false;
    };
  }, [id]);

  const { producto, error, cargando } = resultado.id === id
    ? resultado
    : { producto: null, error: '', cargando: true };

  if (cargando) {
    return (
      <Container className="my-5 scp-page">
        <p role="status">Cargando SCP...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5 scp-page">
        <Alert variant="danger" role="alert">{error}</Alert>
      </Container>
    );
  }

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
            description={producto.description}
            price={producto.price}
            stock={producto.stock}
          />
        </div>
      </div>
    </Container>
  );
}

export default ProductDetail;
