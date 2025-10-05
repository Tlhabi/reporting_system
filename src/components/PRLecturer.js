import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../App.css";

function PRLecturer() {
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState("");

 
  useEffect(() => {
    fetch("http://localhost:5000/reports")
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error(err));
  }, []);

  
  const handleFeedback = (id) => {
    alert(`Feedback sent for Report ID: ${id}\nMessage: ${feedback}`);
    setFeedback(""); 
  };

  return (
<>
<Navbar/>
    <div className="portal-container">
      <h2>Principal Lecturer Portal</h2>
      <p>View lecturer reports, add feedback, monitor, and rate performance.</p>

      <h3 className="mt-4">All Lecturer Reports</h3>
      <table className="table table-dark table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Course</th>
            <th>Lecturer</th>
            <th>Topic</th>
            <th>Students</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r.ID}>
              <td>{r.ID}</td>
              <td>{r.Course_Name}</td>
              <td>{r.Lecturer_Name}</td>
              <td>{r.Topic_Taught}</td>
              <td>
                {r.Students_Present}/{r.Total_Students_Registered}
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Write feedback..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="form-control form-control-sm"
                />
                <button
                  className="btn btn-sm btn-success mt-1"
                  onClick={() => handleFeedback(r.ID)}
                >
                  Submit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default PRLecturer;
