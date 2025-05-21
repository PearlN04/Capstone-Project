import React, { useState, useEffect } from 'react';
import './SmartAdvisor.css';

const SmartAdvisor = () => {
  const [majors, setMajors] = useState([]);  // List of majors
  const [selectedMajor, setSelectedMajor] = useState(null);  // Selected major
  const [majorDetails, setMajorDetails] = useState(null);  // Details of selected major

  // Fetch majors from the backend
  useEffect(() => {
    fetch('http://localhost:8080/api/majors/getAll')
      .then(response => response.json())
      .then(data => setMajors(data))
      .catch(error => console.error('Error fetching majors:', error));
  }, []);

  // Handle major selection
  const handleMajorSelect = (e) => {
    const majorID = e.target.value;
    setSelectedMajor(majorID);
    console.log('Selected Major ID:', majorID);

    // Fetch details of the selected major
    fetch(`http://localhost:8080/api/majors/getMajor/${majorID}`)  
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Major Details Response:', data); 
    setMajorDetails(data);
  })
  .catch(error => console.error('Error fetching major details:', error));}
  

  return (
    <div className="smart-advisor-container">
      <h1>Smart Advisor</h1>
      
      <label htmlFor="major-select">Select Your Major:</label>
      <select id="major-select" onChange={handleMajorSelect}>
        <option value="">-- Select Major --</option>
        {majors.map((major) => (
          <option key={major.majorID} value={major.majorID}>
            {major.majorName}
          </option>
        ))}
      </select>

      {majorDetails && (
        <div className="major-details">
          <h2>{majorDetails.majorName} Details</h2>  
          <p><strong>Total Courses Required:</strong> {majorDetails.totalCourses}</p>  
          <p><strong>Total Credits:</strong> {majorDetails.totalCredits}</p>  

          <h3>Required Courses</h3>
          <ul>
            {majorDetails.requiredCourses.map((course, index) => (
              <li key={index}>{course}</li>
            ))}
          </ul>

          <h3>Common Electives</h3>
          <ul>
            {majorDetails.commonElectives.map((elective, index) => (
              <li key={index}>{elective}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SmartAdvisor;
