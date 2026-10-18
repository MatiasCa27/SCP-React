import { Form } from 'react-bootstrap';
import FormField from '../molecules/FormField';
import PasswordField from '../molecules/PasswordField';
import Button from '../atoms/Button';
import '../../styles/organisms/AuthForm.css';

function AuthForm({
  usuario,
  password,
  setUsuario,
  setPassword,
  handleSubmit,
  volver,
  registro = false
}) {
  return (
    <Form onSubmit={handleSubmit} className="scp-auth-form">
      <FormField
        label="Usuario"
        type="text"
        placeholder={registro ? 'Ingrese un usuario' : 'Ingrese su usuario'}
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />

      <PasswordField
        label="Contraseña"
        placeholder={registro ? 'Ingrese una contraseña' : 'Ingrese su contraseña'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit">
        {registro ? 'Registrarse' : 'Iniciar Sesión'}
      </Button>

      <Button type="button" variant="secondary" className="ms-2" onClick={volver}>
        Volver
      </Button>
    </Form>
  );
}

export default AuthForm;