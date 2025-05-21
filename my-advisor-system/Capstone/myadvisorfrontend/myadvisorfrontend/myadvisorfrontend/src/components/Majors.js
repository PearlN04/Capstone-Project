import React, { useState, useEffect } from 'react';
import { Button, Table } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Majors.css'; 

const Majors = () => {
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
   
    const fetchMajors = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/advisors/3/majors'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMajors(data);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    };

    fetchMajors();
  }, []); 

  const handleRowClick = (major) => {
    setSelectedMajor(major);
  };

  const handleViewMajor = () => {
    if (selectedMajor) {
      navigate('/major-details', { state: { major: selectedMajor } });
    } else {
      alert('Please select a major.');
    }
  };

  return (
    <div className="major-container">
      <header className="major-header">
        <div className="header-left">
          <button className="home-button" onClick={() => navigate('/AdvisorDashboard')}>Home</button>
        </div>
        <div className="header-middle">
          <h1>My Majors</h1>
        </div>
      </header>
      <main className="major-main">
        <Table>
          <thead>
            <tr>
              <th>Major Name</th>
              <th>Total Courses</th>
              <th>Total Credits</th>
            </tr>
          </thead>
          <tbody>
            {majors.map((major) => (
              <tr
                key={major.id}
                onClick={() => handleRowClick(major)}
                className={selectedMajor === major ? 'selected-row' : ''}
              >
                <td>{major.majorName}</td>
                <td>{major.totalCourses}</td>
                <td>{major.totalCredits}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>
      <div className="major-actions">
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewMajor}
        >
          Edit Major details
        </Button>
      </div>
    </div>
  );
};

export default Majors;
