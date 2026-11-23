import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from '../../pages/Products';

describe('Products Page', () => {
  const scp = {
    id: 21,
    nombre: 'SCP-Prueba',
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

  beforeEach(() => {
    sessionStorage.clear();
    spyOn(window, 'alert');
    fetchSpy = spyOn(window, 'fetch').and.returnValue(respuesta([]));
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  const mostrarProductos = () => {
    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );
  };

  it('carga el catálogo desde la API y permite crear un SCP', async () => {
    sessionStorage.setItem('usuario', 'admin');
    sessionStorage.setItem('rol', 'admin');
    fetchSpy.and.returnValues(respuesta([]), respuesta(scp, 201));

    mostrarProductos();
    await screen.findByText('No hay SCP para mostrar.');
    fireEvent.click(screen.getByRole('button', { name: '+ Agregar SCP' }));

    const formulario = (await screen.findByRole('dialog')).querySelector('form');
    const campos = {
      name: 'SCP-Prueba',
      description: 'Descripción de prueba',
      category: 'Safe',
      price: '10000',
      stock: '5'
    };

    Object.entries(campos).forEach(([nombre, valor]) => {
      fireEvent.change(formulario.querySelector(`[name="${nombre}"]`), {
        target: { value: valor }
      });
    });

    fireEvent.submit(formulario);

    expect(await screen.findByText('SCP-Prueba')).toBeTruthy();
    const [url, options] = fetchSpy.calls.mostRecent().args;
    expect(url).toContain('/api/v1/scps');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toEqual({
      nombre: 'SCP-Prueba',
      descripcion: 'Descripción de prueba',
      categoria: 'Safe',
      precio: 10000,
      stock: 5
    });
  });

  it('actualiza el SCP usando PUT', async () => {
    sessionStorage.setItem('usuario', 'admin');
    sessionStorage.setItem('rol', 'admin');
    const actualizado = { ...scp, nombre: 'SCP-Prueba editado' };
    fetchSpy.and.returnValues(respuesta([scp]), respuesta(actualizado));

    mostrarProductos();
    fireEvent.click(await screen.findByRole('button', { name: 'Editar SCP' }));

    const formulario = (await screen.findByRole('dialog')).querySelector('form');
    fireEvent.change(formulario.querySelector('[name="name"]'), {
      target: { value: actualizado.nombre }
    });
    fireEvent.submit(formulario);

    expect(await screen.findByText(actualizado.nombre)).toBeTruthy();
    expect(fetchSpy.calls.mostRecent().args[1].method).toBe('PUT');
    expect(fetchSpy.calls.mostRecent().args[0]).toContain('/api/v1/scps/21');
  });

  it('actualiza el stock del servidor al comprar un SCP', async () => {
    sessionStorage.setItem('usuario', 'usuario1');
    sessionStorage.setItem('rol', 'usuario');
    fetchSpy.and.returnValues(
      respuesta([scp]),
      respuesta({ ...scp, stock: 4 })
    );

    mostrarProductos();
    fireEvent.click(await screen.findByRole('button', { name: 'Comprar' }));

    expect(await screen.findByText('Stock disponible: 4')).toBeTruthy();
    expect(fetchSpy.calls.mostRecent().args[1].method).toBe('PATCH');
    expect(JSON.parse(fetchSpy.calls.mostRecent().args[1].body)).toEqual({ cantidad: -1 });
    expect(window.alert).toHaveBeenCalledWith('Producto comprado exitosamente');
  });
});
