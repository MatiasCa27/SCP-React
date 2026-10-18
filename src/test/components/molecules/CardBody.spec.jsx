import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody Component', () => {
  it('renderiza el nombre y la descripción del SCP', () => {
    render(
      <CardBody
        title="SCP-262"
        description="Un abrigo con propiedades anómalas"
        price={15000}
        stock={5}
      />
    );

    expect(screen.getByText('SCP-262')).toBeTruthy();
    expect(screen.getByText('Un abrigo con propiedades anómalas')).toBeTruthy();
  });

  it('muestra correctamente el precio y stock', () => {
    render(
      <CardBody
        title="SCP-268"
        description="Una gorra anómala"
        price={20000}
        stock={10}
      />
    );

    const precio = screen.getByText('$20000');

    expect(precio).toBeTruthy();
    expect(precio.classList.contains('scp-price')).toBeTrue();
    expect(screen.getByText('Stock disponible: 10')).toBeTruthy();
  });

  it('muestra stock cero y permite cambiar la etiqueta del título', () => {
    render(
      <CardBody
        title="SCP-914"
        description="Una máquina anómala"
        price={30000}
        variant="h3"
      />
    );

    const titulo = screen.getByRole('heading', { level: 3 });

    expect(titulo.textContent).toBe('SCP-914');
    expect(screen.getByText('Stock disponible: 0')).toBeTruthy();
  });
});