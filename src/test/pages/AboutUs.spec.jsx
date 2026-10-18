import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AboutUs from '../../pages/AboutUs';

describe('AboutUs Page', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('muestra el título y la información de la tienda', () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: 'Sobre nosotros' })).toBeTruthy();
    expect(screen.getByText(/comercialización de objetos anómalos/)).toBeTruthy();
    expect(screen.getByText(/Nosotros conseguimos el producto/)).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Volver' })).toBeTruthy();
  });

  it('regresa a Home cuando no hay una sesión activa', () => {
    render(
      <MemoryRouter initialEntries={['/about-us']}>
        <Routes>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/" element={<div>Página principal</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Volver' }));

    expect(screen.getByText('Página principal')).toBeTruthy();
  });

  it('regresa al catálogo cuando hay una sesión activa', () => {
    sessionStorage.setItem('usuario', 'usuario1');
    sessionStorage.setItem('rol', 'usuario');

    render(
      <MemoryRouter initialEntries={['/about-us']}>
        <Routes>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/products" element={<div>Catálogo de SCP</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Volver' }));

    expect(screen.getByText('Catálogo de SCP')).toBeTruthy();
  });
});