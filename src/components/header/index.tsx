import React from 'react';
import logoMarvel from '../../assets/logo/logoMarvel.png';
import './header.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-content">
        <a href="/"><img src={logoMarvel} alt="Marvel Logo" /></a>
      </div>
    </div>
  );
};

export default Header;
