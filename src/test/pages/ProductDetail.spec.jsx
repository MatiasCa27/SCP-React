import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail';
import products from '../../data/products';

describe('ProductDetail Page', () => {
  const claves = [
    'productos',
    'stockOriginales',
    'productosEliminados',
    'productosEditados'
  ];

  const mostrarDetalle = (id) => {
    render(
      <MemoryRouter initialEntries={[`/products/${id}`]}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    claves.forEach((clave) => localStorage.removeItem(clave));
  });

  afterEach(() => {
    claves.forEach((clave) => localStorage.removeItem(clave));
  });

  it('muestra la información completa del SCP', () => {
    const producto = products[0];

    mostrarDetalle(producto.id);

    expect(screen.getByRole('heading', { name: 'Detalle del SCP' })).toBeTruthy();
    expect(screen.getByText(producto.name)).toBeTruthy();
    expect(screen.getByText(producto.longDescription)).toBeTruthy();
    expect(screen.getByText(`$${producto.price}`)).toBeTruthy();

    const imagen = screen.getByAltText(producto.name);
    expect(imagen.getAttribute('src')).toBe(producto.image);
  });

  it('muestra un mensaje cuando el SCP no existe', () => {
    mostrarDetalle(99999);

    expect(screen.getByRole('heading', { name: 'Producto no encontrado' })).toBeTruthy();
    expect(screen.queryByText('Detalle del SCP')).toBeNull();
  });

  it('muestra el stock actualizado del SCP', () => {
    const producto = products[0];

    localStorage.setItem(
      'stockOriginales',
      JSON.stringify([{ id: producto.id, stock: 3 }])
    );

    mostrarDetalle(producto.id);

    expect(screen.getByText('Stock disponible: 3')).toBeTruthy();
    expect(screen.getByText(producto.name)).toBeTruthy();
  });
});