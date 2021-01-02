import React from 'react';
import Logo from '../Logo';
import MainMenu from '../MainMenu';
import UserHeader from '../UserHeader';

import './Header.scss';

const Header = () => {
  return (
    <div className="Header">
      <div className="Header_container">
        <Logo />
        <MainMenu />
        <UserHeader />
      </div>
    </div>
  );
};

export default Header;
