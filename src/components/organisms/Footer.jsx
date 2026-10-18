import { Link } from 'react-router-dom';
import '../../styles/organisms/Layout.css';

function Footer() {
  return (
    <footer className="scp-footer">
      <nav className="scp-footer-links">
        <Link to="/about-us">About Us</Link>
        <a href="https://www.instagram.com/theinsurgency_of_chaos/" target="_blank" rel="noopener noreferrer">Contact Us</a>
      </nav>
    </footer>
  );
}

export default Footer;