import { useSelector } from 'react-redux';
import { selectUserData } from '../Redux/Features/userAuthSlice';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Sidebar from '../components/Sidebar/Sidebar';
import NavBar from '../components/Header/NavBar';

const DashboardLayout = ({ children }) => {
  const { isLoggedIn } = useSelector(selectUserData);

  if (!isLoggedIn) {
    return <Navigate to='/signin' replace />;
  }

  return (
    <main className='d-flex justify-content-between'>
      <aside className='col-1 col-lg-2 side'>
        <Sidebar />
      </aside>
      <article className='col-12'>
        <NavBar />
        {children}
      </article>
    </main>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
