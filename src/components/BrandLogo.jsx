import Logo from '../assets/bookadoc-logo.png';
import { Link } from 'react-router-dom';

function BrandLogo() {
  return (
    <Link to='/'>
      <figure>
        {' '}
        <img src={Logo} alt='Book a doc Logo' />
      </figure>
    </Link>
  );
}

export default BrandLogo;
