import { Container, Row, Modal } from 'react-bootstrap';
import { useState } from 'react';
import products from '../data/products';
import ProductCard from '../components/organisms/ProductCard';
import Button from '../components/atoms/Button';
import ProductForm from '../components/organisms/ProductForm';
import { obtenerProductos } from '../utils/productUtils';
import '../styles/organisms/ProductModal.css';

const PRODUCTO_VACIO = {
  name: '',
  description: '',
  longDescription: '',
  price: '',
  stock: '',
  image: ''
};

function Products() {
  const [listaProductos, setListaProductos] = useState(obtenerProductos);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({ ...PRODUCTO_VACIO });

  const rol = sessionStorage.getItem('rol');

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    setNuevoProducto({ ...PRODUCTO_VACIO });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rol !== 'admin') return;

    const precio = Number(nuevoProducto.price);
    const stock = Number(nuevoProducto.stock);

    if (
      nuevoProducto.price === '' ||
      nuevoProducto.stock === '' ||
      !Number.isFinite(precio) ||
      !Number.isInteger(stock) ||
      precio <= 0 ||
      stock < 0
    ) {
      alert('El precio debe ser mayor que 0 y el stock debe ser un número entero no negativo');
      return;
    }

    if (productoEditando !== null) {
      const productoActualizado = {
        ...nuevoProducto,
        id: productoEditando,
        price: precio,
        stock
      };

      const productosActualizados = listaProductos.map((product) =>
        product.id === productoEditando ? productoActualizado : product
      );

      if (products.some((product) => product.id === productoEditando)) {
        const productosEditados = JSON.parse(localStorage.getItem('productosEditados')) || [];

        localStorage.setItem(
          'productosEditados',
          JSON.stringify([
            ...productosEditados.filter((product) => product.id !== productoEditando),
            productoActualizado
          ])
        );
      }

      guardarStock(productosActualizados);
      alert('SCP actualizado correctamente');
   
    } else {
      const nuevoId = Math.max(0, ...products.map((product) => product.id), ...listaProductos.map((product) => product.id)) + 1;
      const productoAgregado = {
        ...nuevoProducto,
        id: nuevoId,
        price: precio,
        stock
      };

      guardarStock([...listaProductos, productoAgregado]);
      alert('SCP agregado correctamente');
    }

    cerrarFormulario();
  };

  const guardarStock = (productosActualizados) => {
    const productosGuardados = productosActualizados.filter(
      (product) => !products.some((original) => original.id === product.id)
    );

    const stockOriginales = productosActualizados
      .filter((product) => products.some((original) => original.id === product.id))
      .map((product) => ({ id: product.id, stock: product.stock }));

    localStorage.setItem('productos', JSON.stringify(productosGuardados));
    localStorage.setItem('stockOriginales', JSON.stringify(stockOriginales));
    setListaProductos(productosActualizados);
  };

  const cambiarStock = (id, cantidad) => {
    if (rol !== 'admin') return;

    const productosActualizados = listaProductos.map((product) =>
      product.id === id
        ? { ...product, stock: Math.max(0, (product.stock ?? 0) + cantidad) }
        : product
    );

    guardarStock(productosActualizados);
  };

  const comprarProducto = (id) => {
    if (rol !== 'usuario' || !sessionStorage.getItem('usuario')) return;

    const producto = listaProductos.find((product) => product.id === id);
    if (!producto || producto.stock <= 0) return;

    const productosActualizados = listaProductos.map((product) =>
      product.id === id
        ? { ...product, stock: product.stock - 1 }
        : product
    );

    guardarStock(productosActualizados);
    alert('Producto comprado exitosamente');
  };

  const eliminarProducto = (id) => {
    if (rol !== 'admin') return;
    if (!window.confirm('¿Estás seguro de eliminar este SCP?')) return;

    const productosActualizados = listaProductos.filter((product) => product.id !== id);
    guardarStock(productosActualizados);

    if (products.some((product) => product.id === id)) {
      const eliminados = JSON.parse(localStorage.getItem('productosEliminados')) || [];

      if (!eliminados.includes(id)) {
        localStorage.setItem('productosEliminados', JSON.stringify([...eliminados, id]));
      }

      const productosEditados = JSON.parse(localStorage.getItem('productosEditados')) || [];

      localStorage.setItem(
        'productosEditados',
        JSON.stringify(productosEditados.filter((product) => product.id !== id))
      );
    }

    if (productoEditando === id) cerrarFormulario();
  };

  const editarProducto = (product) => {
    if (rol !== 'admin') return;

    setNuevoProducto({ ...product });
    setProductoEditando(product.id);
    setMostrarFormulario(true);
  };

  const agregarProducto = () => {
    if (rol !== 'admin') return;

    setNuevoProducto({ ...PRODUCTO_VACIO });
    setProductoEditando(null);
    setMostrarFormulario(true);
  };

  return (
    <Container className="my-5 scp-page">
      <h1>Productos</h1>

      {rol === 'admin' && (
        <Button onClick={agregarProducto}>+ Agregar SCP</Button>
      )}

      <Row>
        {listaProductos.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cambiarStock={cambiarStock}
            eliminarProducto={eliminarProducto}
            editarProducto={editarProducto}
            comprarProducto={comprarProducto}
          />
        ))}
      </Row>

      <Modal
        show={mostrarFormulario && rol === 'admin'}
        onHide={cerrarFormulario}
        centered
        scrollable
        className="scp-product-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {productoEditando !== null ? 'Editar SCP' : 'Agregar SCP'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            product={nuevoProducto}
            setProduct={setNuevoProducto}
            handleSubmit={handleSubmit}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Products;