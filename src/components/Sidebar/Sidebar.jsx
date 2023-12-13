import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.scss';
import { SidebarData } from './SidebarData';
import { NavLink } from 'react-router-dom';
import BrandLogo from '../BrandLogo';
import Logout from '../../Pages/Logout/Logout';
import { useGlobalHooks } from '../../Hooks/globalHooks';
import { useSelector } from 'react-redux';
import { selectGlobal } from '../../Redux/Features/globalSlice';
import { selectUserData } from '../../Redux/Features/userAuthSlice';

function Sidebar({ close }) {
  const toggle = useSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const { authUser } = useSelector(selectUserData);

  const userRole =
    Object.keys(authUser).length !== 0 ? authUser.image.record.role : '';

  const pages =
    userRole === 'user'
      ? SidebarData.filter(
          (route) =>
            route.title !== 'Delete Doctors' && route.title !== 'Add Doctors',
        )
      : SidebarData;

  return (
    <main className=' sidebarContainer'>
      <article className={`sidebar `}>
        <div className='col-8 mx-auto mt-5 mb-5'>
          <BrandLogo />
        </div>
        <ul className='mt-5 d-flex flex-column justify-content-between'>
          {pages.map((tab) => (
            <React.Fragment key={tab.id}>
              <NavLink
                key={tab.id}
                to={tab.url}
                className={({ isActive }) =>
                  isActive ? 'sidebarActive' : 'sidebarNotActive'
                }
              >
                <li onClick={close}>
                  <hgroup className='d-flex flex-row align-items-center col-8 mx-auto tabTitle'>
                    <h4>{tab.title}</h4>
                  </hgroup>
                </li>
              </NavLink>
            </React.Fragment>
          ))}
        </ul>
        <li
          className='sidebarNotActive tabTitle'
          onClick={() => handleShow('logout')}
        >
          <hgroup className='d-flex flex-row align-items-center col-8 mx-auto tabTitle'>
            <h4> Logout </h4>
          </hgroup>
        </li>
      </article>
      {toggle['logout'] && (
        <Logout id='logout' close={() => handleShow('logout')} />
      )}
    </main>
  );
}

Sidebar.propTypes = {
  close: PropTypes.func,
};

export default Sidebar;
