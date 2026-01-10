import { Link } from "react-router-dom";
import './Navbar.css';
import Cart from "../Cart";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function Navbar() {
  return (
    <><nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/catalogue">Catalogue</Link></li>
        <li><Link to="/aboutus">About us</Link></li>
        <li><Link to="/terms">Terms & Conditions</Link></li>
        <li><Link to="/FAQ">FAQ</Link></li>
        <li><Link to="/links">Links</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <ul className="nav-links">
        <li><Link to="/signup"><i className="bi bi-person"></i> Sign up</Link></li>
        <li className="dropdown"><button className="btn p-0" id="cartbtn" data-bs-toggle="dropdown">
          <i className="bi bi-cart"></i></button>
          <div className="dropdown-menu dropdown-menu-end p-3 mt-2">
            <Cart />
          </div>
          </li>
      </ul>
    </nav>
    <div className="advert">Subscribe to our <Link to="/newsletter">Newsletter</Link> to stay updated on the latest news !</div></>
  );
}

export default Navbar;
