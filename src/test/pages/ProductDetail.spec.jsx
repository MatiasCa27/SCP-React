import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail';

describe('ProductDetail Page', () => {
  const scp = {
    id: 21,
    nombre: 'SCP-262',
    descripcion: 'Descripción de prueba',
    categoria: 'Safe',
    precio: 10000,
    stock: 5
  };

  const respuesta = (body, status = 200) => Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
    text: () => Promise.resolve('')
  });

  let fetchSpy;

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
    fetchSpy = spyOn(window, 'fetch').and.returnValue(respuesta(scp));
  });

  it('muestra la información del producto obtenido desde la API', async () => {
    mostrarDetalle(scp.id);

    expect(await screen.findByRole('heading', { name: 'Detalle del SCP' })).toBeTruthy();
    expect(screen.getByText(scp.nombre)).toBeTruthy();
    expect(screen.getByText(scp.descripcion)).toBeTruthy();
    expect(screen.getByText(`$${scp.precio}`)).toBeTruthy();

    const imagen = screen.getByAltText(scp.nombre);
    expect(imagen.getAttribute('src')).toBe('/images/scp-262.webp');
    expect(fetchSpy.calls.mostRecent().args[0]).toContain(`/api/v1/scps/${scp.id}`);
  });

  it('muestra un mensaje cuando el SCP no existe', async () => {
    fetchSpy.and.returnValue(respuesta(null, 404));
    mostrarDetalle(99999);

    expect(await screen.findByRole('heading', { name: 'Producto no encontrado' })).toBeTruthy();
    expect(screen.queryByText('Detalle del SCP')).toBeNull();
  });

  it('muestra el stock actual del SCP', async () => {
    fetchSpy.and.returnValue(respuesta({ ...scp, stock: 3 }));
    mostrarDetalle(scp.id);

    expect(await screen.findByText('Stock disponible: 3')).toBeTruthy();
    expect(screen.getByText(scp.nombre)).toBeTruthy();
  });
});
