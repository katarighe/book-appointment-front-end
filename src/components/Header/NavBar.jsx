import React from 'react';
import './Navbar.scss';

import { selectUserData } from '../../Redux/Features/userAuthSlice';
import { useSelector } from 'react-redux';
// import Spinner from '../../spinner/Spinner';

function NavBar() {
  const { authUser } = useSelector(selectUserData);

  console.log(authUser);

  const userLogo = authUser.image_url;

  return (
    <main className='NavBar col-12'>
      <header className='container d-flex justify-content-end col-12  col-md-8 align-items-center gap-3'>
        <figure className='userInitials '>
          {userLogo ? (
            <img src={userLogo} alt='' />
          ) : (
            <img
              src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png'
              alt=''
            />
          )}
        </figure>

        <h4> {authUser.name} </h4>
      </header>
    </main>
  );
}

export default NavBar;
