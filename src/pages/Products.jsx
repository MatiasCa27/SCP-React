import { Container, Row, Modal } from 'react-bootstrap';
import { useState } from 'react';
import products from '../data/Products';
import ProductCard from '../components/organisms/ProductCard';
import Button from '../components/atoms/Button';
import ProductForm from '../components/organisms/ProductForm';
import { obtenerProductos } from '../utils/productUtils';
import '../styles/organisms/ProductModal.css';

function Products() {
  const [listaProductos, setListaProductos] = useState(obtenerProductos);
  const rol = sessionStorage.getItem('rol');

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);

  const [nuevoProducto, setNuevoProducto] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    image: ''
  });

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);

    setNuevoProducto({
      name: '',
      description: '',
      price: '',
      stock: '',
      image: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rol !== 'admin') return;

    if (
      nuevoProducto.price === '' ||
      nuevoProducto.stock === '' ||
      !Number.isFinite(Number(nuevoProducto.price)) ||
      !Number.isFinite(Number(nuevoProducto.stock)) ||
      Number(nuevoProducto.price) <= 0 ||
      Number(nuevoProducto.stock) < 0
    ) {
      alert('El precio debe ser mayor que 0 y el stock no puede ser negativo');
      return;
    }

    if (productoEditando !== null) {
      const productoActualizado = {
        ...nuevoProducto,
        id: productoEditando,
        price: Number(nuevoProducto.price),
        stock: Number(nuevoProducto.stock)
      };

      const productosActualizados = listaProductos.map((product) =>
        product.id === productoEditando
          ? productoActualizado
          : product
      );

      setListaProductos(productosActualizados);

      if (products.some((product) => product.id === productoEditando)) {
        const productosEditados =
          JSON.parse(localStorage.getItem('productosEditados')) || [];

        const otrosEditados = productosEditados.filter(
          (product) => product.id !== productoEditando
        );

        localStorage.setItem(
          'productosEditados',
          JSON.stringify([...otrosEditados, productoActualizado])
        );

        const stockOriginales =
          JSON.parse(localStorage.getItem('stockOriginales')) || [];

        const otrosStocks = stockOriginales.filter(
          (item) => item.id !== productoEditando
        );

        localStorage.setItem(
          'stockOriginales',
          JSON.stringify([
            ...otrosStocks,
            {
              id: productoEditando,
              stock: productoActualizado.stock
            }
          ])
        );
      } else {
        const productosGuardados =
          JSON.parse(localStorage.getItem('productos')) || [];

        const productosActualizadosGuardados = productosGuardados.map(
          (product) =>
            product.id === productoEditando
              ? productoActualizado
              : product
        );

        localStorage.setItem(
          'productos',
          JSON.stringify(productosActualizadosGuardados)
        );
      }

      alert('SCP actualizado correctamente');
    } else {
      const productoAgregado = {
        ...nuevoProducto,
        id: Date.now(),
        price: Number(nuevoProducto.price),
        stock: Number(nuevoProducto.stock)
      };

      const productosGuardados =
        JSON.parse(localStorage.getItem('productos')) || [];

      productosGuardados.push(productoAgregado);

      localStorage.setItem(
        'productos',
        JSON.stringify(productosGuardados)
      );

      setListaProductos([...listaProductos, productoAgregado]);

      alert('SCP agregado correctamente');
    }

    cerrarFormulario();
  };

  const cambiarStock = (id, cantidad) => {
    if (rol !== 'admin') return;

    const productosActualizados = listaProductos.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          stock: Math.max(0, (product.stock ?? 0) + cantidad)
        };
      }

      return product;
    });

    setListaProductos(productosActualizados);

    const productosGuardados = productosActualizados.filter(
      (product) =>
        !products.some((original) => original.id === product.id)
    );

    localStorage.setItem(
      'productos',
      JSON.stringify(productosGuardados)
    );

    const stockOriginales = productosActualizados
      .filter((product) =>
        products.some((original) => original.id === product.id)
      )
      .map((product) => ({
        id: product.id,
        stock: product.stock
      }));

    localStorage.setItem(
      'stockOriginales',
      JSON.stringify(stockOriginales)
    );
  };

  const eliminarProducto = (id) => {
    if (rol !== 'admin') return;

    const confirmar = window.confirm(
      '¿Estás seguro de eliminar este SCP?'
    );

    if (!confirmar) return;

    const productosActualizados = listaProductos.filter(
      (product) => product.id !== id
    );

    setListaProductos(productosActualizados);

    const productosGuardados = productosActualizados.filter(
      (product) =>
        !products.some((original) => original.id === product.id)
    );

    localStorage.setItem(
      'productos',
      JSON.stringify(productosGuardados)
    );

    const eliminados =
      JSON.parse(localStorage.getItem('productosEliminados')) || [];

    if (products.some((product) => product.id === id)) {
      if (!eliminados.includes(id)) {
        eliminados.push(id);
      }

      localStorage.setItem(
        'productosEliminados',
        JSON.stringify(eliminados)
      );
    }

    if (productoEditando === id) {
      cerrarFormulario();
    }
  };

  const editarProducto = (product) => {
    if (rol !== 'admin') return;

    setNuevoProducto({ ...product });
    setProductoEditando(product.id);
    setMostrarFormulario(true);
  };

  const agregarProducto = () => {
    if (rol !== 'admin') return;

    setNuevoProducto({
      name: '',
      description: '',
      price: '',
      stock: '',
      image: ''
    });

    setProductoEditando(null);
    setMostrarFormulario(true);
  };

  return (
    <Container className="my-5">
      <h1>Productos</h1>

      {rol === 'admin' && (
        <Button onClick={agregarProducto}>
          + Agregar SCP
        </Button>
      )}

      <Row>
        {listaProductos.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            cambiarStock={cambiarStock}
            eliminarProducto={eliminarProducto}
            editarProducto={editarProducto}
          />
        ))}
      </Row>

      <Modal
        show={mostrarFormulario && rol === 'admin'}
        onHide={cerrarFormulario}
        centered
        className="scp-product-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {productoEditando !== null
              ? 'Editar SCP'
              : 'Agregar SCP'}
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