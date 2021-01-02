import React from 'react';

import logo from '../../assets/img/logo.svg';

import './Logo.scss';

const Logo = () => {
  return (
    <div className="Logo">
      <div className="Logo_img">
        <img src={logo} alt="#" />
      </div>
      <div className="Logo_text">Learn Special</div>
    </div>
  );
};

export default Logo;
