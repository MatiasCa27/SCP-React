import { Button as BootstrapButton } from 'react-bootstrap';
import '../../styles/atoms/Button.css';

function Button({ children, className = '', ...props }) {
  return (
    <BootstrapButton {...props} className={`scp-button ${className}`}>
      {children}
    </BootstrapButton>
  );
}

export default Button;