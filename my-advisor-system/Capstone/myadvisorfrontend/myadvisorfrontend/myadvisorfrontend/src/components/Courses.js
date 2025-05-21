import React, { useState, useEffect } from 'react';
import './Courses.css'; // Assuming you have styles here
import { useNavigate } from 'react-router-dom';

const CourseManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Function to fetch courses from backend
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/courses/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched courses:', data); // Log fetched data
      setCourses(data); // Update state with the fetched data
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch courses when the component mounts
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleDeleteCourse = async () => {
    if (selectedCourse) {
      if (window.confirm(`Are you sure you want to delete ${selectedCourse.courseName}?`)) {
        try {
          // Send DELETE request to the backend
          const response = await fetch(`http://localhost:8080/api/courses/${selectedCourse.courseCode}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          // Update the state to remove the deleted course
          setCourses(courses.filter(course => course.courseCode !== selectedCourse.courseCode));
          setSelectedCourse(null);
          alert('Course successfully deleted!');
        } catch (error) {
          console.error('Error deleting course:', error);
          alert('Failed to delete course.');
        }
      }
    }
  };

  const filteredCourses = courses.filter(course =>
    (course.courseName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="course-management-container">
      <h1>Course Management</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a course"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={() => navigate('/add-course')}>
          Add a New Course
        </button>
      </div>

      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.courseCode} // Unique key for each course, assuming courseCode is unique
              onClick={() => handleSelectCourse(course)}
              className={selectedCourse && selectedCourse.courseCode === course.courseCode ? 'selected' : ''}
            >
              {course.courseCode} - {course.courseName} {/* Display course code and name */}
            </div>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>

      {selectedCourse && (
        <div className="course-actions">
          <button onClick={() => alert('Edit functionality goes here')}>Edit Course</button>
          <button onClick={handleDeleteCourse}>Delete Course</button>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
