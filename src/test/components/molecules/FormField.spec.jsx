import { render, screen, fireEvent } from '@testing-library/react';
import FormField from '../../../components/molecules/FormField';

describe('FormField Component', () => {
  it('renderiza la etiqueta y el campo correctamente', () => {
    render(
      <FormField label="Usuario" placeholder="Ingrese su usuario" />
    );

    expect(screen.getByText('Usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingrese su usuario')).toBeTruthy();
  });

  it('permite escribir en el campo', () => {
    const handleChange = jasmine.createSpy('handleChange');

    render(
      <FormField
        label="Nombre"
        placeholder="Ingrese su nombre"
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Ingrese su nombre'), {
      target: { value: 'Matias' }
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('aplica correctamente las propiedades del campo', () => {
    render(
      <FormField
        label="Correo"
        placeholder="Ingrese su correo"
        type="email"
        required
      />
    );

    const input = screen.getByPlaceholderText('Ingrese su correo');

    expect(input.type).toBe('email');
    expect(input.required).toBeTrue();
    expect(input.classList.contains('scp-input')).toBeTrue();
  });
});