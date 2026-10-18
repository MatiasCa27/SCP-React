import { Form } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import PasswordField from '../molecules/PasswordField';
import '../../styles/organisms/AuthForm.css';

function LoginForm({ usuario, password, setUsuario, setPassword, handleSubmit, volver }) {
  return (
    <Form onSubmit={handleSubmit} className="scp-auth-form">
      <FormField label="Usuario" type="text" placeholder="Ingrese su usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
      <PasswordField label="Contraseña" placeholder="Ingrese su contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit">Iniciar Sesión</Button>
      <Button type="button" variant="secondary" className="ms-2" onClick={volver}>Volver</Button>
    </Form>
  );
}

export default LoginForm;