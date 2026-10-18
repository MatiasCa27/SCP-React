import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';

describe('Login Page', () => {
  const mostrarLogin = () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<div>Catálogo de SCP</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  const ingresarDatos = (usuario, password) => {
    fireEvent.change(screen.getByPlaceholderText('Ingrese su usuario'), {
      target: { value: usuario }
    });

    fireEvent.change(screen.getByPlaceholderText('Ingrese su contraseña'), {
      target: { value: password }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Iniciar Sesión' }));
  };

  beforeEach(() => {
    sessionStorage.clear();
    localStorage.removeItem('usuarios');
    spyOn(window, 'alert');
  });

  afterEach(() => {
    sessionStorage.clear();
    localStorage.removeItem('usuarios');
  });

  it('permite iniciar sesión como administrador', () => {
    mostrarLogin();
    ingresarDatos('admin', 'admin123');

    expect(sessionStorage.getItem('usuario')).toBe('admin');
    expect(sessionStorage.getItem('rol')).toBe('admin');
    expect(screen.getByText('Catálogo de SCP')).toBeTruthy();
  });

  it('permite iniciar sesión con un usuario registrado', () => {
    localStorage.setItem('usuarios', JSON.stringify([
      { username: 'usuario1', password: '123456' }
    ]));

    mostrarLogin();
    ingresarDatos('usuario1', '123456');

    expect(sessionStorage.getItem('usuario')).toBe('usuario1');
    expect(sessionStorage.getItem('rol')).toBe('usuario');
    expect(screen.getByText('Catálogo de SCP')).toBeTruthy();
  });

  it('rechaza las credenciales incorrectas', () => {
    mostrarLogin();
    ingresarDatos('usuarioIncorrecto', 'claveIncorrecta');

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
    expect(sessionStorage.getItem('usuario')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Iniciar sesión' })).toBeTruthy();
  });
});