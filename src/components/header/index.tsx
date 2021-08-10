import React from 'react';
import logoMarvel from '../../assets/logo/logoMarvel.png';
import './header.css';

const Header = () => (
  <div className="header-container">
    <div className="header-content">
      <img src={logoMarvel} alt="Marvel Logo" />
    </div>
  </div>
);

export default Header;
