import { render, screen, fireEvent } from '@testing-library/react';
import PasswordField from '../../../components/molecules/PasswordField';

describe('PasswordField Component', () => {
  it('renderiza la etiqueta y el campo de contraseña', () => {
    render(
      <PasswordField label="Contraseña" placeholder="Ingrese su contraseña" />
    );

    const input = screen.getByPlaceholderText('Ingrese su contraseña');

    expect(screen.getByText('Contraseña')).toBeTruthy();
    expect(input.type).toBe('password');
  });

  it('muestra la contraseña al presionar Mostrar', () => {
    render(
      <PasswordField label="Contraseña" placeholder="Ingrese su contraseña" />
    );

    fireEvent.click(screen.getByText('Mostrar'));

    const input = screen.getByPlaceholderText('Ingrese su contraseña');

    expect(input.type).toBe('text');
    expect(screen.getByText('Ocultar')).toBeTruthy();
  });

  it('vuelve a ocultar la contraseña al presionar Ocultar', () => {
    render(
      <PasswordField label="Contraseña" placeholder="Ingrese su contraseña" />
    );

    fireEvent.click(screen.getByText('Mostrar'));
    fireEvent.click(screen.getByText('Ocultar'));

    const input = screen.getByPlaceholderText('Ingrese su contraseña');

    expect(input.type).toBe('password');
    expect(screen.getByText('Mostrar')).toBeTruthy();
  });
});