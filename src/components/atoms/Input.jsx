import { Form } from 'react-bootstrap';
import '../../styles/atoms/Input.css';

function Input({ className = '', ...props }) {
  return (
    <Form.Control
      {...props}
      className={`scp-input ${className}`}
    />
  );
}

export default Input;