import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Advisor.css'; // imports the Advisor CSS file for styling
import Profile from './Profile';


//Advisor Dashboard
function AdvisorDashboard() {
    const navigate = useNavigate(); 

    return (
        <div className="dashboard-container">
          
            <div className="profile-section">
                <h1 className="dashboard-title">MyAdvisor</h1>
                <div className="profile-info">
                    <span>Welcome, Advisor</span>
                    <button 
                        className="profile-button"
                        onClick={() => navigate('/Profile')} 
                        >
                        Profile
                    </button>
                </div>
            </div>

            {/*Advisor Dashboard Tiles */}
            <div className="menu-section">
                {/*Appointments tile */}
                <div className="menu-tile">
                    <p>Appointment - For managing appointments</p>
                    <button 
                        className="menu-button" 
                        onClick={() => navigate('/appointments')} // Navigate to the appointments screen
                    >
                        Manage Appointments
                    </button>
                </div>
                
                {/*Majors tiles*/}
                <div className="menu-tile">
                    <p>Majors - View and manage your academic majors</p>
                    <button 
                        className="menu-button" 
                        onClick={() => navigate('/majors')} // Navigate to the majors page
                    >
                        Manage Majors
                    </button>
                </div>
                
                {/*Add Courses title */}
                <div className="menu-tile">
                    <p>Courses - For managing courses and enrollment</p>
                    <button 
                        className="menu-button" 
                        onClick={() => navigate('/courses')} // Navigate to the add courses page
                    >
                        Manage Courses
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdvisorDashboard;
