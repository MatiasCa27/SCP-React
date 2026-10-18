import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../../components/organisms/Footer';

describe('Footer Component', () => {
  it('renderiza los enlaces About Us y Contact Us', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText('About Us')).toBeTruthy();
    expect(screen.getByText('Contact Us')).toBeTruthy();
  });

  it('dirige correctamente a la página About Us', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const enlace = screen.getByRole('link', { name: 'About Us' });

    expect(enlace.getAttribute('href')).toBe('/about-us');
  });

  it('abre Contact Us en Instagram en una nueva pestaña', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const enlace = screen.getByRole('link', { name: 'Contact Us' });

    expect(enlace.getAttribute('href')).toBe('https://www.instagram.com/theinsurgency_of_chaos/');
    expect(enlace.getAttribute('target')).toBe('_blank');
    expect(enlace.getAttribute('rel')).toContain('noopener');
    expect(enlace.getAttribute('rel')).toContain('noreferrer');
  });
});