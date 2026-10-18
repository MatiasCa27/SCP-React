import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Button Component', () => {
  it('renderiza el texto del botón', () => {
    render(<Button>Comprar</Button>);

    expect(screen.getByText('Comprar')).toBeTruthy();
  });

  it('ejecuta la función al hacer clic', () => {
    const handleClick = jasmine.createSpy('handleClick');

    render(<Button onClick={handleClick}>Comprar</Button>);

    fireEvent.click(screen.getByText('Comprar'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('no permite hacer clic cuando está deshabilitado', () => {
    const handleClick = jasmine.createSpy('handleClick');

    render(
      <Button onClick={handleClick} disabled>
        Agotado
      </Button>
    );

    fireEvent.click(screen.getByText('Agotado'));

    expect(handleClick).not.toHaveBeenCalled();
  });
});