import PropTypes from 'prop-types';
import './logout.css';
import { Link } from 'react-router-dom';
import PopUp from '../../components/popUps/PopUp';
import { useAuthHook } from '../../Hooks/authHook';

const Logout = ({ id, close }) => {
  const { logoutUser } = useAuthHook();

  return (
    <div className='container-logout  '>
      <PopUp id={id}>
        <div className='logout  '>
          <h1>Log Out?</h1>
          <p>Are you sure you want to Log out of your account?</p>
          <div className='buttons'>
            <Link to='/' className='outline-dark' onClick={close}>
              Cancel
            </Link>
            <button className='main-btn log' onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </PopUp>
    </div>
  );
};

Logout.propTypes = {
  id: PropTypes.string,
  close: PropTypes.func,
};

export default Logout;
