import { Container, Table } from 'react-bootstrap';
import { useState } from 'react';
import Button from '../components/atoms/Button';
import { obtenerCarrito, guardarCarrito, carritoEstaVacio } from '../utils/shopUtils';

function Cart() {
  const [items, setItems] = useState(obtenerCarrito);

  const actualizarCantidad = (id, delta) => {
    const actualizados = items
      .map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(0, (item.cantidad ?? 1) + delta) }
          : item
      )
      .filter((item) => item.cantidad > 0);
    guardarCarrito(actualizados);
    setItems(actualizados);
  };

  const eliminarItem = (id) => {
    const actualizados = items.filter((item) => item.id !== id);
    guardarCarrito(actualizados);
    setItems(actualizados);
  };

  const total = items.reduce(
    (acc, item) => acc + Number(item.price || 0) * (item.cantidad || 1),
    0
  );

  const finalizarCompra = () => {
    if (carritoEstaVacio(items)) {
      alert('El carrito está vacío');
      return;
    }
    guardarCarrito([]);
    setItems([]);
    alert('Compra realizada exitosamente');
  };

  return (
    <Container className="my-5 scp-page">
      <h1>Carrito de compras</h1>

      {carritoEstaVacio(items) ? (
        <p className="scp-empty-message">Tu carrito de compras está vacío.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SCP</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.cantidad || 1}</td>
                  <td>${Number(item.price || 0) * (item.cantidad || 1)}</td>
                  <td>
                    <Button type="button" onClick={() => actualizarCantidad(item.id, 1)}>+</Button>
                    <Button type="button" onClick={() => actualizarCantidad(item.id, -1)}>-</Button>
                    <Button type="button" onClick={() => eliminarItem(item.id)}>Quitar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <p>Total: ${total}</p>
          <Button type="button" onClick={finalizarCompra}>Finalizar compra</Button>
        </>
      )}
    </Container>
  );
}

export default Cart;