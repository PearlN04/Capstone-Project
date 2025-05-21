import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
      <h2>Myadvisor by UCT</h2>
      </div>
      <div className="header-right">
        <span>Welcome, Faculty Admin</span>
        <button className="profile-button">Profile</button>
      </div>
    </header>
  );
};

export default Header;