import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductCard from '../../../components/organisms/ProductCard';

describe('ProductCard Component', () => {
  const producto = {
    id: 1,
    name: 'SCP-262',
    description: 'Un abrigo con propiedades anómalas',
    price: 15000,
    stock: 5,
    image: '/images/scp-262.webp'
  };

  afterEach(() => {
    sessionStorage.clear();
  });

  it('muestra la información del SCP y permite ver sus detalles', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <Routes>
          <Route
            path="/products"
            element={<ProductCard product={producto} />}
          />
          <Route
            path="/products/:id"
            element={<div>Página de detalles del SCP</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('SCP-262')).toBeTruthy();
    expect(screen.getByText('Un abrigo con propiedades anómalas')).toBeTruthy();
    expect(screen.getByText('$15000')).toBeTruthy();
    expect(screen.getByAltText('SCP-262')).toBeTruthy();

    fireEvent.click(screen.getByText('Ver detalles'));

    expect(screen.getByText('Página de detalles del SCP')).toBeTruthy();
  });

  it('permite comprar un SCP cuando el usuario tiene sesión', () => {
    sessionStorage.setItem('rol', 'usuario');
    sessionStorage.setItem('usuario', 'usuario1');

    const comprarProducto = jasmine.createSpy('comprarProducto');

    render(
      <MemoryRouter>
        <ProductCard
          product={producto}
          comprarProducto={comprarProducto}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Comprar'));

    expect(comprarProducto).toHaveBeenCalledOnceWith(1);
    expect(screen.queryByText('Editar SCP')).toBeNull();
    expect(screen.queryByText('Eliminar SCP')).toBeNull();
  });

  it('permite al administrador modificar y eliminar SCP', () => {
    sessionStorage.setItem('rol', 'admin');
    sessionStorage.setItem('usuario', 'admin');

    const cambiarStock = jasmine.createSpy('cambiarStock');
    const editarProducto = jasmine.createSpy('editarProducto');
    const eliminarProducto = jasmine.createSpy('eliminarProducto');

    render(
      <MemoryRouter>
        <ProductCard
          product={producto}
          cambiarStock={cambiarStock}
          editarProducto={editarProducto}
          eliminarProducto={eliminarProducto}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('Editar SCP'));
    fireEvent.click(screen.getByText('Eliminar SCP'));

    expect(cambiarStock).toHaveBeenCalledWith(1, 1);
    expect(cambiarStock).toHaveBeenCalledWith(1, -1);
    expect(editarProducto).toHaveBeenCalledWith(producto);
    expect(eliminarProducto).toHaveBeenCalledWith(1);
    expect(screen.queryByText('Comprar')).toBeNull();
  });
});