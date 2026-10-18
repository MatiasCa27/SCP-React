import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import StockControls from '../molecules/StockControls';
import '../../styles/organisms/ProductCard.css';

function ProductCard({ product, cambiarStock, eliminarProducto, editarProducto, comprarProducto }) {
  const navigate = useNavigate();
  const rol = sessionStorage.getItem('rol');

  return (
    <Card style={{ width: '18rem' }} className="scp-card m-2">
      <Image src={product.image} alt={product.name} className="card-img-top" />
      <Card.Body>
        <CardBody
          title={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
        />

        <Button variant="primary" onClick={() => navigate(`/products/${product.id}`)}>
          Ver detalles
        </Button>

        {rol === 'usuario' && (
          <Button
            variant="success"
            disabled={product.stock <= 0}
            onClick={() => comprarProducto(product.id)}
          >
            {product.stock > 0 ? 'Comprar' : 'Agotado'}
          </Button>
        )}

        {rol === 'admin' && (
          <>
            <StockControls
              stock={product.stock ?? 0}
              aumentar={() => cambiarStock(product.id, 1)}
              disminuir={() => cambiarStock(product.id, -1)}
            />
            <Button variant="warning" onClick={() => editarProducto(product)}>
              Editar SCP
            </Button>
            <Button variant="danger" onClick={() => eliminarProducto(product.id)}>
              Eliminar SCP
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;