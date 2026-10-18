import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Input Component', () => {
  it('renderiza el campo correctamente', () => {
    render(<Input placeholder="Ingrese su usuario" />);

    expect(screen.getByPlaceholderText('Ingrese su usuario')).toBeTruthy();
  });

  it('permite escribir en el campo', () => {
    const handleChange = jasmine.createSpy('handleChange');

    render(<Input placeholder="Usuario" onChange={handleChange} />);

    fireEvent.change(screen.getByPlaceholderText('Usuario'), {
      target: { value: 'matias' }
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('aplica correctamente la propiedad disabled', () => {
    render(<Input placeholder="Campo deshabilitado" disabled />);

    const input = screen.getByPlaceholderText('Campo deshabilitado');

    expect(input.disabled).toBeTrue();
    expect(input.classList.contains('scp-input')).toBeTrue();
  });
});