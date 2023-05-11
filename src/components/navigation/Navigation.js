import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <h1>Bookstore CMS</h1>
      <div className="nav-links">
        <Link className="nav-link books" to="/">BOOKS</Link>
        <Link className="nav-link categories" to="/categories">CATEGORIES</Link>
      </div>
      <FontAwesomeIcon className="icon" icon={faUserCircle} />
    </nav>
  );
}

export default Navigation;
