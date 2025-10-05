import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/student">Student</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/lecturer">Lecturer</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/principal-lecturer">Principal Lecturer</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/program-leader">Program Leader</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
