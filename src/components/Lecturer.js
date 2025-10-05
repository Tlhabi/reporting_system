import React, { useState, useEffect } from "react";
import "../App.css"; 
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Lecturer() {
  const [report, setReport] = useState({});
  const [allReports, setAllReports] = useState([]);
  const [lecturer, setLecturer] = useState({
    Full_Names: "",
    Email: "",
    Password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLecturerChange = (e) => {
    setLecturer({ ...lecturer, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/lecturers/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lecturer),
    })
      .then((res) => res.text())
      .then((data) => alert(data))
      .catch((err) => console.error(err));
  };


  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/lecturers/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lecturer),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid login");
        setLoggedIn(true);
      })
      .catch(() => alert("Invalid email or password"));
  };

  const handleChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        setReport({});
        fetchReports();
      })
      .catch((err) => console.error(err));
  };

  
  const fetchReports = () => {
    fetch("http://localhost:5000/reports")
      .then((res) => res.json())
      .then((data) => setAllReports(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchReports();
  }, []);


  if (!loggedIn) {
    return (
      <div className="student-container">
        <div className="form-box">
          <h2>Lecturer Portal</h2>
          <h4>{isRegistering ? "Register" : "Login"}</h4>

          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <input
                className="form-control"
                name="Full_Names"
                placeholder="Full Names"
                value={lecturer.Full_Names}
                onChange={handleLecturerChange}
                required
              />
            )}
            <input
              className="form-control"
              name="Email"
              type="email"
              placeholder="Email"
              value={lecturer.Email}
              onChange={handleLecturerChange}
              required
            />
            <input
              className="form-control"
              name="Password"
              type="password"
              placeholder="Password"
              value={lecturer.Password}
              onChange={handleLecturerChange}
              required
            />
            <button type="submit" className="btn btn-primary mt-3">
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <p style={{ marginTop: "10px" }}>
            {isRegistering ? "Already have an account?" : "No account yet?"}{" "}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="btn btn-link"
            >
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>

          <Link to="/" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar />
    <div className="portal-container">

    
      <div className="portal-form">
        <h2>Lecturer Reporting Form</h2>
        <form onSubmit={handleSubmit}>
          <input className="form-control" name="Faculty_Name" placeholder="Faculty Name" value={report.Faculty_Name || ""} onChange={handleChange} />
          <input className="form-control" name="Class_Name" placeholder="Class Name" value={report.Class_Name || ""} onChange={handleChange} />
          <input className="form-control" name="Week" placeholder="Week" value={report.Week || ""} onChange={handleChange} />
          <input className="form-control" type="date" name="Date_of_Lecture" value={report.Date_of_Lecture || ""} onChange={handleChange} />
          <input className="form-control" name="Course_Name" placeholder="Course Name" value={report.Course_Name || ""} onChange={handleChange} />
          <input className="form-control" name="Course_Code" placeholder="Course Code" value={report.Course_Code || ""} onChange={handleChange} />
          <input className="form-control" name="Lecturer_Name" placeholder="Lecturer Name" value={report.Lecturer_Name || ""} onChange={handleChange} />
          <input className="form-control" type="number" name="Students_Present" placeholder="Students Present" value={report.Students_Present || ""} onChange={handleChange} />
          <input className="form-control" type="number" name="Total_Students_Registered" placeholder="Total Students" value={report.Total_Students_Registered || ""} onChange={handleChange} />
          <input className="form-control" name="Class_Venue" placeholder="Venue" value={report.Class_Venue || ""} onChange={handleChange} />
          <input className="form-control" name="Lecture_Time" placeholder="Lecture Time" value={report.Lecture_Time || ""} onChange={handleChange} />
          <input className="form-control" name="Topic_Taught" placeholder="Topic Taught" value={report.Topic_Taught || ""} onChange={handleChange} />
          <textarea className="form-control" name="Learning_Outcomes" placeholder="Learning Outcomes" value={report.Learning_Outcomes || ""} onChange={handleChange}></textarea>
          <textarea className="form-control" name="Recommendations" placeholder="Recommendations" value={report.Recommendations || ""} onChange={handleChange}></textarea>
          <button type="submit" className="btn btn-primary mt-2">Submit Report</button>
        </form>
      </div>

      <div className="portal-table">
        <h2>All Reports</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Faculty</th>
              <th>Class</th>
              <th>Week</th>
              <th>Date</th>
              <th>Topic</th>
              <th>Lecturer</th>
            </tr>
          </thead>
          <tbody>
            {allReports.map((r) => (
              <tr key={r.ID}>
                <td>{r.ID}</td>
                <td>{r.Faculty_Name}</td>
                <td>{r.Class_Name}</td>
                <td>{r.Week}</td>
                <td>{r.Date_of_Lecture}</td>
                <td>{r.Topic_Taught}</td>
                <td>{r.Lecturer_Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/" className="btn btn-secondary mt-3">Back to Dashboard</Link>
      </div>
    </div>
    </>
  );
}

export default Lecturer;
