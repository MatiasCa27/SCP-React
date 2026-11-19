import { Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import ProductCard from '../components/organisms/ProductCard';
import { obtenerFavoritos, guardarFavoritos, favoritosEstaVacio } from '../utils/shopUtils';

function Favorites() {
  const [favoritos, setFavoritos] = useState(obtenerFavoritos);

  const quitarFavorito = (id) => {
    const actualizados = favoritos.filter((item) => item.id !== id);
    guardarFavoritos(actualizados);
    setFavoritos(actualizados);
  };

  return (
    <Container className="my-5 scp-page">
      <h1>Tus favoritos</h1>

      {favoritosEstaVacio(favoritos) ? (
        <p className="scp-empty-message">No tienes productos en favoritos todavía.</p>
      ) : (
        <Row>
          {favoritos.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              eliminarFavorito={quitarFavorito}
            />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Favorites;