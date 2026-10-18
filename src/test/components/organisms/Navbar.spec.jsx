import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../../../components/organisms/Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    sessionStorage.setItem('usuario', 'admin');
    sessionStorage.setItem('rol', 'admin');
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('muestra el nombre de la tienda y el enlace de productos', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const marca = screen.getByText('Insurgencia del Caos');
    const productos = screen.getByText('Productos');

    expect(marca.getAttribute('href')).toBe('/products');
    expect(productos.getAttribute('href')).toBe('/products');
  });

  it('activa el menú hamburguesa al hacer clic', async () => {
    const { container } = render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const botonMenu = screen.getByRole('button', { name: 'Toggle navigation' });
    const menu = container.querySelector('#basic-navbar-nav');

    expect(menu.classList.contains('collapse')).toBeTrue();

    fireEvent.click(botonMenu);

    await waitFor(() => {
      const activado =
        menu.classList.contains('collapsing') ||
        menu.classList.contains('show');

      expect(activado).toBeTrue();
    });
  });

  it('cierra la sesión y vuelve a la página principal', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <Routes>
          <Route path="/products" element={<NavBar />} />
          <Route path="/" element={<div>Página principal</div>} />
        </Routes>
      </MemoryRouter>
    );

    const botonMenu = screen.getByRole('button', { name: 'Toggle navigation' });
    fireEvent.click(botonMenu);

    fireEvent.click(screen.getByText('Cerrar sesión'));

    expect(sessionStorage.getItem('usuario')).toBeNull();
    expect(sessionStorage.getItem('rol')).toBeNull();
    expect(screen.getByText('Página principal')).toBeTruthy();
  });
});