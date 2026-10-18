import { render, screen, fireEvent } from '@testing-library/react';
import StockControls from '../../../components/molecules/StockControls';

describe('StockControls Component', () => {
  it('muestra correctamente el stock disponible', () => {
    render(<StockControls stock={5} />);

    expect(screen.getByText('5')).toBeTruthy();
    expect(screen.getByRole('button', { name: '+' })).toBeTruthy();
    expect(screen.getByRole('button', { name: '-' })).toBeTruthy();
  });

  it('ejecuta las funciones para aumentar y disminuir stock', () => {
    const aumentar = jasmine.createSpy('aumentar');
    const disminuir = jasmine.createSpy('disminuir');

    render(
      <StockControls stock={5} aumentar={aumentar} disminuir={disminuir} />
    );

    fireEvent.click(screen.getByRole('button', { name: '+' }));
    fireEvent.click(screen.getByRole('button', { name: '-' }));

    expect(aumentar).toHaveBeenCalledTimes(1);
    expect(disminuir).toHaveBeenCalledTimes(1);
  });

  it('deshabilita el botón de disminuir cuando el stock es cero', () => {
    const disminuir = jasmine.createSpy('disminuir');

    render(<StockControls stock={0} disminuir={disminuir} />);

    const botonDisminuir = screen.getByRole('button', { name: '-' });
    const botonAumentar = screen.getByRole('button', { name: '+' });

    expect(botonDisminuir.disabled).toBeTrue();
    expect(botonAumentar.disabled).toBeFalse();

    fireEvent.click(botonDisminuir);

    expect(disminuir).not.toHaveBeenCalled();
  });
});