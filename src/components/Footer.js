import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>LUCT Reporting System</h4>
          <p>Streamlining lecturer and student reporting for better performance and accountability.</p>
        </div>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/lecturer">Lecturer Portal</a></li>
            <li><a href="/student">Student Portal</a></li>
            <li><a href="/program-leader">Program Leader</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <p>Email: support@luct.edu</p>
          <p>Phone: +266 500 12345</p>
          <p>Address: Limkokwing University, Maseru</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Limkokwing University of Creative Technology. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
