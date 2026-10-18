import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('muestra la página Home al ingresar al inicio', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', {
      level: 1,
      name: 'Insurgencia del Caos'
    })).toBeTruthy();

    expect(screen.getByRole('button', {
      name: 'Iniciar sesión'
    })).toBeTruthy();
  });

  it('muestra la página Login al ingresar a su ruta', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', {
      name: 'Iniciar sesión'
    })).toBeTruthy();

    expect(screen.getByPlaceholderText('Ingrese su usuario')).toBeTruthy();
  });

  it('muestra la Navbar cuando un usuario autenticado entra a Productos', () => {
    sessionStorage.setItem('usuario', 'admin');
    sessionStorage.setItem('rol', 'admin');

    const { container } = render(
      <MemoryRouter initialEntries={['/products']}>
        <App />
      </MemoryRouter>
    );

    const navbar = container.querySelector('.scp-navbar');
    const marca = navbar?.querySelector('.navbar-brand');

    expect(navbar).toBeTruthy();
    expect(marca).toBeTruthy();
    expect(marca.textContent).toBe('Insurgencia del Caos');
    expect(marca.getAttribute('href')).toBe('/products');
    expect(navbar.textContent).toContain('Cerrar sesión');
  });
});