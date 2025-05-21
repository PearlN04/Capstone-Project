import React, { useState } from "react";
import "./SignUp.css"; 

function SignUp() {
  const [studentNumber, setStudentNumber] = useState("");
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [peoplesoftID, setPeoplesoftID] = useState("");
  const [password, setPassword] = useState("");
  const [majors, setMajors] = useState("");
  const [faculty, setFaculty] = useState("");
  const [yearOfStudy, setYearOfStudy] = useState("");
  const [coursesPassed, setCoursesPassed] = useState("");
  const [message, setMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studentData = {
      studentNumber,
      names,
      email,
      peoplesoftID,
      password,
      majors,
      faculty,
      yearOfStudy,
      coursesPassed,
    };

    try {
      const response = await fetch("http://localhost:8080/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      });

      const result = await response.json();

      if (result === "Student registred successfully!") {
        setMessage(result.message);
       
        setStudentNumber("");
        setNames("");
        setEmail("");
        setPeoplesoftID("");
        setPassword("");
        setMajors("");
        setFaculty("");
        setYearOfStudy("");
        setCoursesPassed("");
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-container bg-gradient">
      <div className="signup-form">
        <h2>Student Sign Up</h2>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label className="label">Student Number</label>
          <input
            type="text"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            className="input"
            required
          />
          <label className="label">Names</label>
          <input
            type="text"
            value={names}
            onChange={(e) => setNames(e.target.value)}
            className="input"
            required
          />
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <label className="label">Peoplesoft ID</label>
          <input
            type="text"
            value={peoplesoftID}
            onChange={(e) => setPeoplesoftID(e.target.value)}
            className="input"
            required
          />
          <label className="label">Password</label>
          <input
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <label className="label">Majors</label>
          <input
            type="text"
            value={majors}
            onChange={(e) => setMajors(e.target.value)}
            className="input"
            required
          />
          <label className="label">Faculty</label>
          <input
            type="text"
            value={faculty}
            onChange={(e) => setFaculty(e.target.value)}
            className="input"
            required
          />
          <label className="label">Year Of Study</label>
          <input
            type="text"
            value={yearOfStudy}
            onChange={(e) => setYearOfStudy(e.target.value)}
            className="input"
            required
          />
          <label className="label">Courses Passed</label>
          <input
            type="text"
            value={coursesPassed}
            onChange={(e) => setCoursesPassed(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="button">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
