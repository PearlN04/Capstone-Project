import React from 'react';
import './HeaderM.css'; 

const HeaderM = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h2>Myadvisor by UCT</h2>
      </div>
      <div className="header-right">
        <span>Welcome, System Admin</span>
        <button className="profile-button">Profile</button>
      </div>
    </header>
  );
};

export default HeaderM;