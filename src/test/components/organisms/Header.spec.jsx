import { render, screen } from '@testing-library/react';
import Header from '../../../components/organisms/Header';

describe('Header Component', () => {
  it('renderiza el nombre de la tienda', () => {
    render(<Header />);

    expect(screen.getByText('Insurgencia del Caos')).toBeTruthy();
  });

  it('utiliza una etiqueta de encabezado de nivel 2', () => {
    render(<Header />);

    const titulo = screen.getByRole('heading', { level: 2 });

    expect(titulo.textContent).toBe('Insurgencia del Caos');
    expect(titulo.tagName).toBe('H2');
  });

  it('aplica correctamente la estructura y clase CSS', () => {
    const { container } = render(<Header />);

    const encabezado = container.querySelector('header');

    expect(encabezado).toBeTruthy();
    expect(encabezado.classList.contains('scp-header')).toBeTrue();
    expect(encabezado.querySelector('h2')).toBeTruthy();
  });
});