import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Student from "./components/Student";
import Lecturer from "./components/Lecturer";
import PRLecturer from "./components/PRLecturer";
import ProgramLeader from "./components/ProgramLeader";
import Footer from "./components/Footer";


import studentImg from "./images/student.jpeg";
import lecturerImg from "./images/lecturer.jpg";
import principalImg from "./images/principal.jpeg";
import leaderImg from "./images/leader.jpg";
import luctlogoIMG from "./images/LUCTLogo.jpg"; 

function App() {
  return (
    <Router>
      <div className="container text-center mt-5">
        <h1 className="mb-4">LUCT Reporting System</h1>

        <div className="row justify-content-center mb-5">
          <div className="col-auto">
            <img
              src={luctlogoIMG}
              alt="LUCT Logo"
              className="img-fluid"
              style={{ maxWidth: "400px", maxHeight: "400px" }}
            />
          </div>
          <p>Welcome to the LUCT Reporting System</p>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <div className="row">
                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img
                      src={studentImg}
                      className="card-img-top"
                      alt="Student"
                      height="200"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Student</h5>
                      <p className="card-text">
                        Access your student portal to register, monitor, and rate.
                      </p>
                      <Link to="/student" className="btn btn-primary">
                        Go to Student Portal
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img
                      src={lecturerImg}
                      className="card-img-top"
                      alt="Lecturer"
                      height="200"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Lecturer</h5>
                      <p className="card-text">
                        Manage classes, submit reports, and monitor student progress.
                      </p>
                      <Link to="/lecturer" className="btn btn-primary">
                        Go to Lecturer Portal
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img
                      src={principalImg}
                      className="card-img-top"
                      alt="Principal Lecturer"
                      height="200"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Principal Lecturer</h5>
                      <p className="card-text">
                        View lecturer reports, analyze class performance, and monitor.
                      </p>
                      <Link to="/principal-lecturer" className="btn btn-primary">
                        Go to Principal Lecturer Portal
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 mb-4">
                  <div className="card">
                    <img
                      src={leaderImg}
                      className="card-img-top"
                      alt="Program Leader"
                      height="200"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Program Leader</h5>
                      <p className="card-text">
                        Access reports, monitor lecturers, and review program statistics.
                      </p>
                      <Link to="/program-leader" className="btn btn-primary">
                        Go to Program Leader Portal
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          <Route path="/student" element={<Student />} />
          <Route path="/lecturer" element={<Lecturer />} />
          <Route path="/principal-lecturer" element={<PRLecturer />} />
          <Route path="/program-leader" element={<ProgramLeader />} />
        </Routes>
        <Footer />

      </div>
    </Router>
  );
}

export default App;
