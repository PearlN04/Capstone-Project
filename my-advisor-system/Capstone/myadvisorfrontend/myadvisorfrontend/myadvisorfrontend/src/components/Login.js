import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const result = await response.json(); 
      
      if (response.ok) {
        const { role, message, id } = result; 
 

        // Navigate based on user role
        if (role === "Student") {
          navigate("/SDashboard");
        } else if (role === "Advisor") {
          navigate("/AdvisorDashboard");
        } else if (role === "Faculty Admin") {
          navigate("facultyAdminDashboard");
        } else if (role === "System Admin") {
          navigate("/manageusers");
        } else {
          navigate("/DefaultDashboard"); 
        }
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  
  const handleSignUp = () => {
    navigate("/SignUp");
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img
          src="my-advisor2/images/uct.jpeg"
          alt="MyAdvisor Illustration"
          className="login-image"
        />
      </div>

      <div className="login-right">
        <div className="login-box">
          <h1 className="login-title">MyAdvisor by UCT</h1>
          <h2 className="login-subtitle">Welcome back</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                Sign In
              </button>
              <a href="/" className="forgot-password">
                Forgot password?
              </a>
              <button type="button" className="btn-signup" onClick={handleSignUp}>
                Sign Up
              </button>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
