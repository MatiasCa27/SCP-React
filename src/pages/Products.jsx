import { useEffect, useState } from 'react';
import { Alert, Container, Modal, Row } from 'react-bootstrap';
import ProductCard from '../components/organisms/ProductCard';
import Button from '../components/atoms/Button';
import ProductForm from '../components/organisms/ProductForm';
import {
  actualizarProducto,
  actualizarStock,
  crearProducto,
  eliminarProducto as eliminarProductoApi,
  obtenerProductos
} from '../utils/productUtils';
import '../styles/organisms/ProductModal.css';

const PRODUCTO_VACIO = {
  name: '',
  description: '',
  category: '',
  price: '',
  stock: ''
};

function mensajeDeError(error) {
  return error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
}

function Products() {
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({ ...PRODUCTO_VACIO });

  const rol = sessionStorage.getItem('rol');

  useEffect(() => {
    let activo = true;

    obtenerProductos()
      .then((productos) => {
        if (activo) setListaProductos(productos);
      })
      .catch((fetchError) => {
        if (activo) setError(`No se pudieron cargar los SCP: ${mensajeDeError(fetchError)}`);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
    setNuevoProducto({ ...PRODUCTO_VACIO });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rol !== 'admin' || guardando) return;

    const precio = Number(nuevoProducto.price);
    const stock = Number(nuevoProducto.stock);

    if (
      nuevoProducto.price === '' ||
      nuevoProducto.stock === '' ||
      !Number.isInteger(precio) ||
      !Number.isInteger(stock) ||
      precio < 0 ||
      stock < 0
    ) {
      setError('El precio y el stock deben ser números enteros no negativos.');
      return;
    }

    setGuardando(true);
    setError('');

    try {
      if (productoEditando !== null) {
        const productoActualizado = await actualizarProducto(productoEditando, nuevoProducto);
        setListaProductos((productos) =>
          productos.map((product) =>
            product.id === productoEditando ? productoActualizado : product
          )
        );
        alert('SCP actualizado correctamente');
      } else {
        const productoCreado = await crearProducto(nuevoProducto);
        setListaProductos((productos) => [...productos, productoCreado]);
        alert('SCP agregado correctamente');
      }

      cerrarFormulario();
    } catch (requestError) {
      setError(`No se pudo guardar el SCP: ${mensajeDeError(requestError)}`);
    } finally {
      setGuardando(false);
    }
  };

  const cambiarStock = async (id, cantidad) => {
    if (rol !== 'admin') return;

    setError('');
    try {
      const productoActualizado = await actualizarStock(id, cantidad);
      setListaProductos((productos) =>
        productos.map((product) => product.id === id ? productoActualizado : product)
      );
    } catch (requestError) {
      setError(`No se pudo actualizar el stock: ${mensajeDeError(requestError)}`);
    }
  };

  const comprarProducto = async (id) => {
    if (rol !== 'usuario' || !sessionStorage.getItem('usuario')) return;

    const producto = listaProductos.find((item) => item.id === id);
    if (!producto || producto.stock <= 0) return;

    setError('');
    try {
      const productoActualizado = await actualizarStock(id, -1);
      setListaProductos((productos) =>
        productos.map((item) => item.id === id ? productoActualizado : item)
      );
      alert('Producto comprado exitosamente');
    } catch (requestError) {
      setError(`No se pudo completar la compra: ${mensajeDeError(requestError)}`);
    }
  };

  const eliminarProducto = async (id) => {
    if (rol !== 'admin') return;
    if (!window.confirm('¿Estás seguro de eliminar este SCP?')) return;

    setError('');
    try {
      await eliminarProductoApi(id);
      setListaProductos((productos) => productos.filter((product) => product.id !== id));
      if (productoEditando === id) cerrarFormulario();
    } catch (requestError) {
      setError(`No se pudo eliminar el SCP: ${mensajeDeError(requestError)}`);
    }
  };

  const editarProducto = (product) => {
    if (rol !== 'admin') return;

    setNuevoProducto({
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      stock: product.stock
    });
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

      {error && <Alert variant="danger" role="alert">{error}</Alert>}

      {rol === 'admin' && (
        <Button onClick={agregarProducto}>+ Agregar SCP</Button>
      )}

      {cargando ? (
        <p role="status">Cargando SCP...</p>
      ) : (
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
          {listaProductos.length === 0 && !error && <p>No hay SCP para mostrar.</p>}
        </Row>
      )}

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
            submitting={guardando}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Products;
