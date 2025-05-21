import React from "react";
import './AdvisorDashboard.css'; // Import the CSS file

function AdvisorDashboardLut() {

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1>MyAdvisor by UCT</h1>
          <div className="header-right">
            <span className="welcome-message">Welcome, Student Advisor!</span>
            <button className="profile-button">Profile</button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="main-content">
        <h2>Dashboard</h2>

        {/* Options Grid */}
        <div className="grid-container">
          {/* View Appointments */}
          <div className="card appointments-card">
            <h3>Appointments</h3>
            <p>View and respond to appointments from your student advisors.</p>
            <button className="card-button">Manage Appointments</button>
          </div>

          {/* Update Availability */}
          <div className="card availability-card">
            <h3>Update Availability</h3>
            <p>Update your availability details.</p>
            <button className="card-button">Manage Availability</button>
          </div>

          {/* Update Major */}
          <div className="card major-card">
            <h3>Update Major</h3>
            <p>Update details about a specific major.</p>
            <button className="card-button">Manage Major</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdvisorDashboardLut;