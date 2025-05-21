import React from "react";
import { useNavigate } from "react-router-dom";
import './SDashboard.css'; // Import the CSS file

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="header-content">
          <h1>MyAdvisor by UCT</h1>
          <div className="header-welcome">
            <span>Welcome, Student!</span>
            <button className="profile-btn" onClick={() => navigate("/SProfile")}>
              Profile
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <h2>Dashboard</h2>


        <div className="grid-container">
          <div className="card">
            <h3>Appointments</h3>
            <p>View and schedule appointments with your student advisors.</p>
            <div className="button-group">
              <button onClick={() => navigate("/ViewAppointments")}>
                Manage Appointments
              </button>
              <button onClick={() => navigate("/BookAppointment")}>
                Create New Appointment
              </button>
            </div>
          </div>


          <div className="card" onClick={() => navigate("/ViewAdvisors")}>
            <h3>Student Advisors</h3>
            <p>View a list of available student advisors to help you with your academic journey.</p>
            <button>View Advisors</button>
          </div>

          <div className="card" onClick={() => navigate("/SmartAdvisor")}>
            <h3>Smart Advisor</h3>
            <p>Get personalized advice and guidance from our AI-powered Smart Advisor.</p>
            <button>Access Smart Advisor</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
