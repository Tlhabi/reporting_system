import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../App.css";

function ProgramLeader() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [plUser, setPlUser] = useState({ Full_Names: "", Email: "", Password: "" });
  const [activeModule, setActiveModule] = useState("dashboard");


  const [course, setCourse] = useState({ Course_Name: "", Lecturer_Assigned: "", Module_Code: "" });
  const [allCourses, setAllCourses] = useState([]);

  const [allReports, setAllReports] = useState([]);

  const handleChange = (e) => {
    setPlUser({ ...plUser, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/program-leaders/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plUser),
    })
      .then((res) => res.text())
      .then((data) => alert(data))
      .catch((err) => console.error(err));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/program-leaders/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plUser),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid login");
        setLoggedIn(true);
        fetchCourses(); 
        fetchReports();
      })
      .catch(() => alert("Invalid email or password"));
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/courses", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(course),
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        setCourse({ Course_Name: "", Lecturer_Assigned: "", Module_Code: "" });
        fetchCourses();
      })
      .catch((err) => console.error(err));
  };

  const fetchCourses = () => {

    fetch("http://localhost:5000/courses")
      .then((res) => res.json())
      .then((data) => setAllCourses(data))
      .catch((err) => console.error(err));
  };

  const fetchReports = () => {
    fetch("http://localhost:5000/reports")
      .then((res) => res.json())
      .then((data) => setAllReports(data))
      .catch((err) => console.error(err));
  };

 
  const renderModule = () => {
    switch (activeModule) {
      case "courses":
        return (
          <div className="pl-module-content">
            <h3>1. Add / Assign Courses & Modules</h3>
            <form onSubmit={handleCourseSubmit}>
              <input
                className="form-control mb-2"
                name="Course_Name"
                placeholder="Course Name"
                value={course.Course_Name}
                onChange={handleCourseChange}
                required
              />
              <input
                className="form-control mb-2"
                name="Module_Code"
                placeholder="Module Code"
                value={course.Module_Code}
                onChange={handleCourseChange}
                required
              />
              <input
                className="form-control mb-2"
                name="Lecturer_Assigned"
                placeholder="Lecturer Assigned (Name or ID)"
                value={course.Lecturer_Assigned}
                onChange={handleCourseChange}
              />
              <button type="submit" className="btn btn-primary">Add Course</button>
            </form>

            <h4 className="mt-3">All Courses</h4>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course Name</th>
                  <th>Module Code</th>
                  <th>Lecturer Assigned</th>
                </tr>
              </thead>
              <tbody>
                {allCourses.map((c) => (
                  <tr key={c.ID}>
                    <td>{c.ID}</td>
                    <td>{c.Course_Name}</td>
                    <td>{c.Module_Code}</td>
                    <td>{c.Lecturer_Assigned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "reports":
        return (
          <div className="pl-module-content">
            <h3>2. Reports from Lecturers (PRL)</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Faculty</th>
                  <th>Class</th>
                  <th>Week</th>
                  <th>Date</th>
                  <th>Topic Taught</th>
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
          </div>
        );
      case "monitoring":
        return (
            <div className="pl-module-content">
                <h3>3. Monitoring Module</h3>
                <p>Content for monitoring lecturer performance and report submissions goes here.</p>
                <p>This could include statistics, late report flags, or attendance summaries.</p>
            </div>
        );
      case "classes":
        return (
             <div className="pl-module-content">
                <h3>4. Classes Management</h3>
                <p>Content for viewing and managing class groups, enrollments, and timetables goes here.</p>
            </div>
        );
      case "lectures":
        return (
            <div className="pl-module-content">
                <h3>5. Lectures/Schedules</h3>
                <p>Content for viewing and organizing lecture schedules and lecture halls goes here.</p>
            </div>
        );
      case "rating":
        return (
            <div className="pl-module-content">
                <h3>6. Lecturer Rating/Feedback</h3>
                <p>Content for viewing student feedback or internal rating of lecturers goes here.</p>
            </div>
        );
      default:
        return <div>Welcome to the Program Leader Dashboard</div>;
    }
  };

  if (!loggedIn) {
    return (
      <div className="student-container">
        <div className="form-box">
          <h2>Program Leader Portal</h2>
          <h4>{isRegistering ? "Register" : "Login"}</h4>

          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            {isRegistering && (
              <input
                className="form-control mb-2"
                name="Full_Names"
                placeholder="Full Names"
                value={plUser.Full_Names}
                onChange={handleChange}
                required
              />
            )}
            <input
              className="form-control mb-2"
              type="email"
              name="Email"
              placeholder="Email"
              value={plUser.Email}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-2"
              type="password"
              name="Password"
              placeholder="Password"
              value={plUser.Password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="btn btn-primary mt-2">
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <p className="mt-2">
            {isRegistering ? "Already have an account?" : "No account yet?"}{" "}
            <button onClick={() => setIsRegistering(!isRegistering)} className="btn btn-link">
              {isRegistering ? "Login" : "Register"}
            </button>
          </p>

          <Link to="/" className="btn btn-secondary mt-2">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="portal-container">
      <div className="pl-module-nav mb-3 text-center">
        <button className="btn btn-primary m-1" onClick={() => setActiveModule("courses")}>Courses</button>
        <button className="btn btn-primary m-1" onClick={() => setActiveModule("reports")}>Reports</button>
        <button className="btn btn-primary m-1" onClick={() => setActiveModule("monitoring")}>Monitoring</button>
        <button className="btn btn-primary m-1" onClick={() => setActiveModule("classes")}>Classes</button>
        <button className="btn btn-primary m-1" onClick={() => setActiveModule("lectures")}>Lectures</button>
        <button className="btn btn-primary m-1" onClick={() => setActiveModule("rating")}>Rating</button>
      </div>

      <div className="pl-module-content text-center mt-3">
        {renderModule()}
      </div>
    </div>
    </>
  );
}

export default ProgramLeader;