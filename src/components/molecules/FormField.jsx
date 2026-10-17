import { Form } from 'react-bootstrap';
import Input from '../atoms/Input';

function FormField({ label, ...props }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Input {...props} />
    </Form.Group>
  );
}

export default FormField;