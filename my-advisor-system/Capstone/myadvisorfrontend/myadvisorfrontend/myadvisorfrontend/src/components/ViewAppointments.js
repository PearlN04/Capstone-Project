import React, { useEffect, useState } from "react";
import "./ViewAppointments.css"; // Import the CSS file

function ViewAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch the appointments from the backend
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments"); 
        const data = await response.json();
        setAppointments(data); 
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="view-appointments">
      <h1 className="title">View Appointments</h1>
      <div className="table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Advisor Name</th>
              <th>Date and Time</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.studentName}</td>
                  <td>{appointment.advisorName}</td>
                  <td>{appointment.dateTime}</td>
                  <td>{appointment.note}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-appointments">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAppointments;
