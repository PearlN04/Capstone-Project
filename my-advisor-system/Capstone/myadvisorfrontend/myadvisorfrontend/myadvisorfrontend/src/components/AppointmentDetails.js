import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AppointmentDetails.css';

const AppointmentDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve the appointment data from state
  const { appointment } = location.state || {};
  console.log('Location State:', location.state);
  console.log('Received Appointment:', appointment); 

  if (!appointment) {
    return <div>No appointment selected.</div>; // Handle cases where appointment data is missing
  }

  // Extract fields from the appointment object
  const { id, dateTime, venue, message, studentNumber, note, status } = appointment;

  const formattedDateTime = new Date(dateTime).toLocaleString();

  const handleCancel = async () => {
    const confirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirmed) return;
  
    try {
      const response = await fetch(`http://localhost:8080/api/appointments/1/cancel`, {
        method: 'PUT',
      });
  
      if (response.ok) {
        alert("Appointment cancelled successfully");
        navigate('/AdvisorDashboard'); // Redirect to home page or appointments list after cancellation
      } else {
        alert("Failed to cancel the appointment");
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      alert("An error occurred while cancelling the appointment");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-appointment/${id}`, { state: { appointment } });
  };

  return (
    <div>
      {/* Top Bar */}
      <div className="top-bar">
        <button className="home-button" onClick={() => navigate('/AdvisorDashboard')}>Home</button>
      </div>

      {/* Appointment Information */}
      <div className="appointment-details-container">
        <div className="appointment-info-box">
          <h2>Appointment Details</h2>
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Date and Time:</strong> {dateTime}</p>
          <p><strong>Venue:</strong> {venue}</p>
          <p><strong>Message:</strong> {message}</p>
          <p><strong>Student Number:</strong> {studentNumber}</p>
          <p><strong>Note:</strong> {note}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="cancel-button" onClick={handleCancel}>Cancel Appointment</button>
        <button className="edit-button" onClick={handleEdit}>Edit Appointment</button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
