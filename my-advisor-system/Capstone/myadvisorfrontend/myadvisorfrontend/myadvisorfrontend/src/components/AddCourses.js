import React, { useState } from 'react';
import './AddCourses.css';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const AddCourse = () => {
  const [course, setCourse] = useState({
    courseCode: '',
    name: '',
    credits: '',
    prerequisite: '',
    equivalents: '',
    faculty: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // course object
    const newCourse = {
      courseCode: course.courseCode,
      courseName: course.name,
      credits: parseInt(course.credits, 10),
      prerequisiteCourses: course.prerequisite.split(',').map(item => item.trim()).filter(Boolean),
      equivalentCourses: course.equivalents.split(',').map(item => item.trim()).filter(Boolean),
      faculty: course.faculty,
    };
    

    //adds a course to the course table
    try {
      const response = await fetch('http://localhost:8080/api/courses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Clear form fields after successful submission
      setCourse({
        courseCode: '',
        name: '',
        credits: '',
        prerequisite: '',
        equivalents: '',
        faculty: '',
      });

       /*Displays a confirmation message when a course has
       been successfully added or an 
       error message when it fails to 
       add a course*/
       
      alert('Course successfully added!');
      navigate('/courses');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course.');
    }
  };

  return (
    <div className="add-course-container">
      <BackButton/>
      <h2>Add a New Course</h2>
      <form className="add-course-form" onSubmit={handleSubmit}>
        <label>
          Course Code:
          <input
            type="text"
            name="courseCode"
            value={course.courseCode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Course Name:
          <input
            type="text"
            name="name"
            value={course.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Credits:
          <input
            type="number"
            name="credits"
            value={course.credits}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Prerequisite Courses (Course Codes separated by commas):
          <input
            type="text"
            name="prerequisite"
            value={course.prerequisite}
            onChange={handleChange}
          />
        </label>

        <label>
          Equivalents (Course Codes separated by commas):
          <input
            type="text"
            name="equivalents"
            value={course.equivalents}
            onChange={handleChange}
          />
        </label>

        <label>
          Faculty:
          <input
            type="text"
            name="faculty"
            value={course.faculty}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
