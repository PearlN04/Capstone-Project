import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './MajorDetails.css'; 

const MajorDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { major } = location.state || {}; 
  
  
  const safeMajor = major || { totalCourses: 0, totalCredits: 0, requiredCourses: [], commonElectives: [] };

  
  const [totalCourses, setTotalCourses] = useState(safeMajor.totalCourses);
  const [totalCredits, setTotalCredits] = useState(safeMajor.totalCredits);
  const [requiredCourses, setRequiredCourses] = useState(safeMajor.requiredCourses);
  const [commonElectives, setCommonElectives] = useState(safeMajor.commonElectives);


  const handleAddRequiredCourse = () => {
    setRequiredCourses([...requiredCourses, '']);
  };

 
  const handleAddCommonElective = () => {
    setCommonElectives([...commonElectives, '']);
  };

  
  const handleSave = () => {
    console.log('Saving major details:', {
      majorID: safeMajor.majorID,
      majorName: safeMajor.majorName,
      totalCourses,
      totalCredits,
      requiredCourses,
      commonElectives,
    });
    alert('Major details saved!');
    navigate('/majors');
  };

 
  return (
    <div>
      
      <div className="top-bar">
        <button className="home-button" onClick={() => navigate('/AdvisorDashboard')}>Home</button>
      </div>

      {/* Edit Major Information */}
      <div className="major-details-container">
        <h2>Edit Major Details: {safeMajor.majorName}</h2>
        
        {/* Edit Total Courses */}
        <div className="major-field">
          <label>Total Number of Courses:</label>
          <input
            type="number"
            value={totalCourses}
            onChange={(e) => setTotalCourses(e.target.value)}
          />
        </div>

        {/* Change or Edit Total Credits */}
        <div className="major-field">
          <label>Total Number of Credits:</label>
          <input
            type="number"
            value={totalCredits}
            onChange={(e) => setTotalCredits(e.target.value)}
          />
        </div>

        {/* Change or Required Courses */}
        <div className="course-list-section">
          <h3>Required Courses</h3>
          {requiredCourses.map((course, index) => (
            <div key={index} className="course-item">
              <input
                type="text"
                value={course}
                onChange={(e) => {
                  const updatedCourses = [...requiredCourses];
                  updatedCourses[index] = e.target.value;
                  setRequiredCourses(updatedCourses);
                }}
              />
              <button onClick={() => setRequiredCourses(requiredCourses.filter((_, i) => i !== index))}>Remove</button>
            </div>
          ))}
          <button onClick={handleAddRequiredCourse}>Add Required Course</button>
        </div>

        {/*Change or Edit Common Electives */}
        <div className="course-list-section">
          <h3>Common Electives</h3>
          {commonElectives.map((course, index) => (
            <div key={index} className="course-item">
              <input
                type="text"
                value={course}
                onChange={(e) => {
                  const updatedElectives = [...commonElectives];
                  updatedElectives[index] = e.target.value;
                  setCommonElectives(updatedElectives);
                }}
              />
              <button onClick={() => setCommonElectives(commonElectives.filter((_, i) => i !== index))}>Remove</button>
            </div>
          ))}
          <button onClick={handleAddCommonElective}>Add Common Elective</button>
        </div>
      </div>

      {/* Save  Major Details Button */}
      <div className="major-actions">
        <button className="save-button" onClick={handleSave}>
          Save Major Details
        </button>
      </div>
    </div>
  );
};

export default MajorDetails;
