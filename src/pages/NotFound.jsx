import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="scp-not-found" data-status="404">
      <h1>Error 404</h1>
      <p>La ruta solicitada no existe o no es valida.</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  );
}

export default NotFound;