import { Link } from 'react-router-dom';
import Logo from '../assets/bookadoc-logo.png';

function BrandLogo() {
  return (
    <Link to="/">
      <figure>
        {' '}
        <img src={Logo} alt="Book a doc Logo" />
      </figure>
    </Link>
  );
}

export default BrandLogo;
