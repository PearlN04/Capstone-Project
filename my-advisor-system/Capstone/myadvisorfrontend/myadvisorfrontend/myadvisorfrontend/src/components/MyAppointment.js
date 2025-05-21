import React, { useState, useEffect } from 'react';
import { Button, Table } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './MyAppointment.css';

const MyAppointments = ({ employeeId }) => {  
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`Fetching appointments for employee ID: :${employeeId}`); // Log the employee ID

    // Fetch appointments from the API using the employeeId
    fetch(`http://localhost:8080/api/appointments/advisor/2`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAppointments(data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });
  }, [employeeId]);  
  
  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    console.log('Selected Appointment:', appointment);
    
  };

  const handleViewAppointment = () => {
    if (selectedAppointment) {
      navigate('/appointment-details', { state: { appointment: selectedAppointment } });
      console.log('Selected Appointment before navigation:', selectedAppointment);
    } else {
      alert('Please select an appointment.');
    }
  };

  return (
    <div className="appointments-container">
      <header className="appointments-header">
        <div className="header-left">
          <button className="home-button" onClick={() => navigate('/AdvisorDashboard')}> Home </button>
        </div>
        <div className="header-middle">
          <h1>My Appointments</h1>
        </div>
      </header>
      <main className="appointments-main">
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Venue</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                onClick={() => handleRowClick(appointment)}
                className={selectedAppointment === appointment ? 'selected-row' : ''}
              >
                <td>{appointment.dateTime}</td>
                <td>{appointment.venue}</td>
                <td>{appointment.message}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </main>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleViewAppointment}
        >
          View Appointment
        </Button>
      </div>
    </div>
  );
};

export default MyAppointments;