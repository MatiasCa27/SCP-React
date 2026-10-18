import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';

describe('Home Page', () => {
  it('muestra el título, logo y botones de inicio', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Insurgencia del Caos');
    expect(screen.getByAltText('Logo de la Insurgencia del Caos').getAttribute('src')).toBe('/images/logo.webp');
    expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeTruthy();
  });

  it('permite navegar a Login', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<div>Página Login</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    expect(screen.getByText('Página Login')).toBeTruthy();
  });

  it('permite navegar a Register', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<div>Página Register</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));

    expect(screen.getByText('Página Register')).toBeTruthy();
  });
});