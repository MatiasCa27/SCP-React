import { Form } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';

function LoginForm({ usuario, password, setUsuario, setPassword, handleSubmit, volver }) {
  return (
    <Form onSubmit={handleSubmit}>
      <FormField label="Usuario" type="text" placeholder="Ingrese su usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      <FormField label="Contraseña" type="password" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit">Iniciar Sesión</Button>
      <Button variant="secondary" className="ms-2" onClick={volver}>Volver</Button>
    </Form>
  );
}

export default LoginForm;