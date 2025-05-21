import React from 'react';
import './FacultyAdminDashboard.css';
import { Link } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3182ce', 
  color: theme.palette.common.white,
  borderRadius: '8px', 
  padding: '8px 16px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#2b6cb0', 
  },
}));

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: '8px', 
  boxShadow: theme.shadows[3],
  padding: '20px', 
  width: '100%',
  height: '220px',
  textAlign: 'center',
  color: '#2d3748', 
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
    backgroundColor: '#ebf8ff', 
  },
}));

const FacultyAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="faculty-dashboard-container">
     
      <header className="faculty-header">
        <div className="faculty-header-container">
        <h1 className="header-title">MyAdvisor</h1>
          <span className="welcome-message">Welcome, Faculty Admin!</span>
        
        </div>
      </header>

    
      <main className="faculty-dashboard-main">
        <Typography variant="h4" className="dashboard-title">
          Faculty Admin Dashboard
        </Typography>
        <div className="dashboard-boxes">
          <DashboardBox>
            <Typography variant="h5" className="box-title">View and Edit Faculty Rules</Typography>
            <Typography variant="body2" className="box-description">Edit faculty rules as needed.</Typography>
            <Link to="/facultyadmin" className="link-button">
              <StyledButton>View or Edit Rules</StyledButton>
            </Link>
          </DashboardBox>
          <DashboardBox>
            <Typography variant="h5" className="box-title">Manage Student Advisors</Typography>
            <Typography variant="body2" className="box-description">Add, edit, and manage student advisor information</Typography>
            <Link to="/manageadvisors" className="link-button">
              <StyledButton>View or Edit Advisor Information</StyledButton>
            </Link>
          </DashboardBox>
        </div>
      </main>
    </div>
  );
};

export default FacultyAdminDashboard;







      
     
  
  