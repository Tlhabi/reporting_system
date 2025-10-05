import React, { useState } from "react";
import Navbar from "./Navbar";  
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function Student() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState({ fullNames: "", email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Full_Names: formData.fullNames,
      Email: formData.email,
      Password: formData.password,
    };

    const url = isRegistering
      ? "http://localhost:5000/students/register"
      : "http://localhost:5000/students/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert(isRegistering ? "✅ Registered successfully!" : "✅ Logged in successfully!");
        setIsLoggedIn(true);
      } else {
        alert(data.message || "❌ Something went wrong!");
      }
    } catch (error) {
      alert("⚠️ Server not responding. Please check backend connection.");
    }
  };

  if (isLoggedIn) {
    return (
      <>
      <Navbar/>
        <div className="student-portal">
          <h2>Student Portal</h2>
          <div className="portal-section">
            <h4>Monitoring</h4>
            <p>Track your academic progress and attendance here.</p>
          </div>
          <div className="portal-section">
            <h4>Rating</h4>
            <p>Rate your learning experience:</p>
            <select className="form-select w-50">
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Poor</option>
            </select>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
    <Navbar/>
      <div className="student-container">
        <h2 className="text-center mb-4">Student Portal</h2>
        <form onSubmit={handleSubmit} className="form-box">
          {isRegistering && (
            <div className="mb-3">
              <label className="form-label">Full Names</label>
              <input type="text" name="fullNames" className="form-control" onChange={handleChange} required />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isRegistering ? "Register" : "Login"}
          </button>

          <p className="text-center mt-3" style={{ color: "black" }}>
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  style={{ color: "black", textDecoration: "underline" }}
                  onClick={() => setIsRegistering(false)}
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  style={{ color: "black", textDecoration: "underline" }}
                  onClick={() => setIsRegistering(true)}
                >
                  Register
                </button>
              </>
            )}
          </p>
        </form>
      </div>
    </>
  );
}

export default Student;
