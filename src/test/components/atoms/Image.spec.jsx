import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image Component', () => {
  it('renderiza una imagen correctamente', () => {
    render(<Image src="/images/logo.webp" alt="Logo SCP" />);

    expect(screen.getByRole('img')).toBeTruthy();
  });

  it('aplica correctamente la ruta de la imagen', () => {
    render(<Image src="/images/logo.webp" alt="Logo SCP" />);

    const imagen = screen.getByRole('img');

    expect(imagen.getAttribute('src')).toBe('/images/logo.webp');
  });

  it('aplica el texto alternativo y la clase CSS', () => {
    render(
      <Image
        src="/images/logo.webp"
        alt="Insurgencia del Caos"
        className="scp-home-logo"
      />
    );

    const imagen = screen.getByAltText('Insurgencia del Caos');

    expect(imagen.classList.contains('scp-home-logo')).toBeTrue();
  });
});