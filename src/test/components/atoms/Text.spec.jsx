import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Component', () => {
  it('renderiza el texto correctamente', () => {
    render(<Text>Insurgencia del Caos</Text>);

    expect(screen.getByText('Insurgencia del Caos')).toBeTruthy();
  });

  it('utiliza la etiqueta HTML indicada', () => {
    render(<Text variant="h1">Catálogo SCP</Text>);

    const titulo = screen.getByRole('heading', { level: 1 });

    expect(titulo.textContent).toBe('Catálogo SCP');
  });

  it('aplica correctamente una clase CSS', () => {
    render(<Text className="scp-price">Precio: $10000</Text>);

    const texto = screen.getByText('Precio: $10000');

    expect(texto.classList.contains('scp-price')).toBeTrue();
    expect(texto.tagName).toBe('P');
  });
});