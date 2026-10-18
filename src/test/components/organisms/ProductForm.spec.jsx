import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../../../components/organisms/ProductForm';

describe('ProductForm Component', () => {
  const producto = {
    name: 'SCP-262',
    description: 'Un abrigo anómalo',
    longDescription: 'Descripción completa del SCP',
    price: 15000,
    stock: 5,
    image: '/images/scp-262.webp'
  };

  it('muestra todos los campos del formulario', () => {
    const { container } = render(
      <ProductForm
        product={producto}
        setProduct={() => {}}
        handleSubmit={() => {}}
      />
    );

    expect(screen.getByText('Nombre del SCP')).toBeTruthy();
    expect(screen.getByText('Descripción corta')).toBeTruthy();
    expect(screen.getByText('Descripción detallada')).toBeTruthy();
    expect(screen.getByText('Precio')).toBeTruthy();
    expect(screen.getByText('Stock inicial')).toBeTruthy();
    expect(screen.getByText('URL de la imagen')).toBeTruthy();

    expect(container.querySelectorAll('input').length).toBe(5);
    expect(container.querySelector('textarea')).toBeTruthy();
  });

  it('actualiza los datos cuando se modifica un campo', () => {
    const setProduct = jasmine.createSpy('setProduct');

    const { container } = render(
      <ProductForm
        product={producto}
        setProduct={setProduct}
        handleSubmit={() => {}}
      />
    );

    const campoNombre = container.querySelector('input[name="name"]');

    fireEvent.change(campoNombre, {
      target: { value: 'SCP-268' }
    });

    expect(setProduct).toHaveBeenCalledWith({
      ...producto,
      name: 'SCP-268'
    });
  });

  it('aplica las restricciones y permite enviar el formulario', () => {
    const handleSubmit = jasmine.createSpy('handleSubmit');

    const { container } = render(
      <ProductForm
        product={producto}
        setProduct={() => {}}
        handleSubmit={handleSubmit}
      />
    );

    const precio = container.querySelector('input[name="price"]');
    const stock = container.querySelector('input[name="stock"]');
    const formulario = container.querySelector('form');

    expect(precio.type).toBe('number');
    expect(precio.min).toBe('1');
    expect(stock.type).toBe('number');
    expect(stock.min).toBe('0');

    fireEvent.submit(formulario);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Guardar SCP' })).toBeTruthy();
  });
});