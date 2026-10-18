import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Register from '../../pages/Register';

describe('Register Page', () => {
  const mostrarRegister = () => {
    render(
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<div>Página Login</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  const ingresarDatos = (usuario, password) => {
    fireEvent.change(screen.getByPlaceholderText('Ingrese un usuario'), {
      target: { value: usuario }
    });

    fireEvent.change(screen.getByPlaceholderText('Ingrese una contraseña'), {
      target: { value: password }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
  };

  beforeEach(() => {
    localStorage.removeItem('usuarios');
    spyOn(window, 'alert');
  });

  afterEach(() => {
    localStorage.removeItem('usuarios');
  });

  it('registra un usuario y lo dirige a Login', () => {
    mostrarRegister();
    ingresarDatos('usuarioNuevo', '123456');

    const usuarios = JSON.parse(localStorage.getItem('usuarios'));

    expect(usuarios.length).toBe(1);
    expect(usuarios[0].username).toBe('usuarioNuevo');
    expect(usuarios[0].password).toBe('123456');
    expect(window.alert).toHaveBeenCalledWith('Usuario registrado correctamente');
    expect(screen.getByText('Página Login')).toBeTruthy();
  });

  it('impide registrar un nombre de usuario duplicado', () => {
    localStorage.setItem('usuarios', JSON.stringify([
      { username: 'usuario1', password: '123456' }
    ]));

    mostrarRegister();
    ingresarDatos('USUARIO1', '654321');

    const usuarios = JSON.parse(localStorage.getItem('usuarios'));

    expect(window.alert).toHaveBeenCalledWith('El nombre de usuario ya existe');
    expect(usuarios.length).toBe(1);
    expect(screen.getByRole('heading', { name: 'Registrarse' })).toBeTruthy();
  });

  it('impide registrar el nombre reservado admin', () => {
    mostrarRegister();
    ingresarDatos('admin', '123456');

    expect(window.alert).toHaveBeenCalledWith('El nombre de usuario ya existe');
    expect(localStorage.getItem('usuarios')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Registrarse' })).toBeTruthy();
  });
});