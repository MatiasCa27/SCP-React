import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

function PasswordField({ label, ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="scp-password-field">
        <Input type={visible ? 'text' : 'password'} {...props} />
        <Button type="button" variant="outline-secondary" onClick={() => setVisible(!visible)}>
          {visible ? 'Ocultar' : 'Mostrar'}
        </Button>
      </div>
    </Form.Group>
  );
}

export default PasswordField;