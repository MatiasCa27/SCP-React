import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import ProductForm from '../components/organisms/ProductForm';

function Admin() {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });


const handleSubmit = (e) => {
  e.preventDefault();

  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];

  const nuevoProducto = {
    ...product,
    id: Date.now(),
    price: Number(product.price)
  };

  productosGuardados.push(nuevoProducto);
  localStorage.setItem('productos', JSON.stringify(productosGuardados));

  alert('SCP agregado correctamente');

  setProduct({
    name: '',
    description: '',
    price: '',
    image: ''
  });
};

  return (
    <Container className="my-5">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de administración de SCP.</p>
      <h2>Agregar nuevo SCP</h2>
      <ProductForm product={product} setProduct={setProduct} handleSubmit={handleSubmit} />
      <Button onClick={() => navigate('/products')}>Volver al catálogo</Button>
    </Container>
  );
}

export default Admin;