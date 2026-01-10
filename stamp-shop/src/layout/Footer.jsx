import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 La Poste Tunisienne. All rights reserved.</p>

      <ul className="footer-links">
        <li><Link to="/terms">Terms & Conditions</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </footer>
  );
}

export default Footer;
