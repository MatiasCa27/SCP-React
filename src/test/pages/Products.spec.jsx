import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from '../../pages/Products';
import products from '../../data/products';

describe('Products Page', () => {
  const claves = [
    'productos',
    'stockOriginales',
    'productosEliminados',
    'productosEditados'
  ];

  beforeEach(() => {
    claves.forEach((clave) => localStorage.removeItem(clave));
    sessionStorage.clear();
    spyOn(window, 'alert');
  });

  afterEach(() => {
    claves.forEach((clave) => localStorage.removeItem(clave));
    sessionStorage.clear();
  });

  const mostrarProductos = () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );
  };

  it('permite al administrador agregar un SCP', async () => {
    sessionStorage.setItem('usuario', 'admin');
    sessionStorage.setItem('rol', 'admin');

    mostrarProductos();

    fireEvent.click(screen.getByRole('button', { name: '+ Agregar SCP' }));

    const modal = await screen.findByRole('dialog');
    const formulario = modal.querySelector('form');

    const campos = {
      name: 'SCP-Prueba',
      description: 'Descripción de prueba',
      longDescription: 'Descripción detallada de prueba',
      price: '10000',
      stock: '5',
      image: '/images/prueba.webp'
    };

    Object.entries(campos).forEach(([nombre, valor]) => {
      fireEvent.change(formulario.querySelector(`[name="${nombre}"]`), {
        target: { value: valor }
      });
    });

    fireEvent.submit(formulario);

    const guardados = JSON.parse(localStorage.getItem('productos'));
    const agregado = guardados.find((producto) => producto.name === 'SCP-Prueba');

    expect(agregado).toBeTruthy();
    expect(agregado.price).toBe(10000);
    expect(agregado.stock).toBe(5);
  });

  it('permite al administrador editar un SCP original', async () => {
    sessionStorage.setItem('usuario', 'admin');
    sessionStorage.setItem('rol', 'admin');

    mostrarProductos();

    fireEvent.click(screen.getAllByRole('button', { name: 'Editar SCP' })[0]);

    const modal = await screen.findByRole('dialog');
    const formulario = modal.querySelector('form');
    const nuevoNombre = 'SCP-262 actualizado';

    fireEvent.change(formulario.querySelector('[name="name"]'), {
      target: { value: nuevoNombre }
    });

    fireEvent.submit(formulario);

    const editados = JSON.parse(localStorage.getItem('productosEditados'));
    const editado = editados.find((producto) => producto.id === products[0].id);

    expect(editado).toBeTruthy();
    expect(editado.name).toBe(nuevoNombre);
    expect(window.alert).toHaveBeenCalledWith('SCP actualizado correctamente');
  });

  it('descuenta el stock cuando un usuario compra un SCP', () => {
    sessionStorage.setItem('usuario', 'usuario1');
    sessionStorage.setItem('rol', 'usuario');

    mostrarProductos();

    fireEvent.click(screen.getAllByRole('button', { name: 'Comprar' })[0]);

    const stocks = JSON.parse(localStorage.getItem('stockOriginales'));
    const stockActualizado = stocks.find((item) => item.id === products[0].id);

    expect(stockActualizado).toBeTruthy();
    expect(stockActualizado.stock).toBe(products[0].stock - 1);
    expect(window.alert).toHaveBeenCalledWith('Producto comprado exitosamente');
  });
});