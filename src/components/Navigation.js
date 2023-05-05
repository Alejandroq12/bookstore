import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

function Navigation() {
  return (
    <nav>
      <h1>Bookstore</h1>
      <Link to="/">Home</Link>
      <Link to="/categories">Categories</Link>
      <FontAwesomeIcon
        icon={faCircleUser}
        style={{
          '--fa-primary-color': '#0290ff',
          '--fa-secondary-color': '#696969',
        }}
      />
    </nav>
  );
}

export default Navigation;
