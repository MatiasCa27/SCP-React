import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../../../components/organisms/AuthForm';

describe('AuthForm Component', () => {
  const props = {
    usuario: 'usuario1',
    password: '123456',
    setUsuario: jasmine.createSpy('setUsuario'),
    setPassword: jasmine.createSpy('setPassword'),
    handleSubmit: jasmine.createSpy('handleSubmit'),
    volver: jasmine.createSpy('volver')
  };

  beforeEach(() => {
    props.setUsuario.calls.reset();
    props.setPassword.calls.reset();
    props.handleSubmit.calls.reset();
    props.volver.calls.reset();
  });

  it('muestra correctamente el formulario de inicio de sesión', () => {
    render(<AuthForm {...props} />);

    expect(screen.getByPlaceholderText('Ingrese su usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingrese su contraseña')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeTruthy();
  });

  it('muestra los textos correspondientes al registro', () => {
    render(<AuthForm {...props} registro />);

    expect(screen.getByPlaceholderText('Ingrese un usuario')).toBeTruthy();
    expect(screen.getByPlaceholderText('Ingrese una contraseña')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeTruthy();
  });

  it('ejecuta las funciones de enviar y volver', () => {
    render(<AuthForm {...props} />);

    const formulario = screen.getByRole('button', { name: 'Iniciar Sesión' }).closest('form');

    fireEvent.submit(formulario);
    fireEvent.click(screen.getByRole('button', { name: 'Volver' }));

    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
    expect(props.volver).toHaveBeenCalledTimes(1);
  });
});