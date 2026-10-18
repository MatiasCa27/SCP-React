import { Form } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import PasswordField from '../molecules/PasswordField';

function RegisterForm({ usuario, password, setUsuario, setPassword, handleSubmit, volver }) {
  return (
    <Form onSubmit={handleSubmit}>
      <FormField label="Usuario" type="text" placeholder="Ingrese un usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      <PasswordField label="Contraseña" placeholder="Ingrese una contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit">Registrarse</Button>
      <Button type="button" variant="secondary" className="ms-2" onClick={volver}>Volver</Button>
    </Form>
  );
}

export default RegisterForm;