import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BsList, BsX } from 'react-icons/bs';
import { selectUserData } from '../Redux/Features/userAuthSlice';
import Sidebar from '../components/Sidebar/Sidebar';
import NavBar from '../components/Header/NavBar';

const DashboardLayout = ({ children }) => {
  const { isLoggedIn } = useSelector(selectUserData);
  const [active, setActive] = useState(false);

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  const handleShowSideBar = () => {
    setActive(!active);
  };

  return (
    <main className="layout d-flex justify-content-between ">
      <aside className=" d-flex flex-column side  col-0  col-lg-2 position-relative">
        <div className="d-flex d-lg-none navIcons">
          {active ? (
            <BsX size={40} onClick={handleShowSideBar} />
          ) : (
            <BsList size={40} onClick={handleShowSideBar} />
          )}
        </div>
        <div
          className={
            active
              ? 'd-flex d-lg-none showSideBar'
              : 'd-flex d-lg-none hideSideBar'
          }
        >
          <Sidebar close={handleShowSideBar} />
        </div>
        <div className="d-none d-lg-flex ">
          <Sidebar />
        </div>
      </aside>
      <article className="col-12 col-lg-10">
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
