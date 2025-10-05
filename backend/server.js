
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       
  password: "",       
  database: "reporting_system" 
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed: " + err.stack);
    return;
  }
  console.log("✅ Connected to MySQL Database");
});

app.post("/lecturers/register", (req, res) => {
  const { Full_Names, Email, Password } = req.body;
  const sql = "INSERT INTO Lecturers (Full_Names, Email, Password) VALUES (?, ?, ?)";
  db.query(sql, [Full_Names, Email, Password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).send("Email already exists.");
      }
      return res.status(500).send("Error registering lecturer.");
    }
    res.send("Lecturer registered successfully!");
  });
});

app.post("/lecturers/login", (req, res) => {
  const { Email, Password } = req.body;
  const sql = "SELECT * FROM Lecturers WHERE Email = ? AND Password = ?";
  db.query(sql, [Email, Password], (err, results) => {
    if (err) return res.status(500).send("Database error.");
    if (results.length === 0) return res.status(401).send("Invalid credentials.");
    res.send("Login successful!");
  });
});


app.post("/program-leaders/register", (req, res) => {
  const { Full_Names, Email, Password } = req.body;
  const sql = "INSERT INTO ProgramLeaders (Full_Names, Email, Password) VALUES (?, ?, ?)";
  db.query(sql, [Full_Names, Email, Password], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(400).send("Email already exists.");
      }
      console.error("Program Leader registration error:", err);
      return res.status(500).send("Error registering Program Leader.");
    }
    res.send("Program Leader registered successfully!");
  });
});

app.post("/program-leaders/login", (req, res) => {
  const { Email, Password } = req.body;
  const sql = "SELECT * FROM ProgramLeaders WHERE Email = ? AND Password = ?";
  db.query(sql, [Email, Password], (err, results) => {
    if (err) return res.status(500).send("Database error.");
    if (results.length === 0) return res.status(401).send("Invalid credentials.");
    res.send("Login successful!");
  });
});


app.post("/courses", (req, res) => {
    const course = req.body;
    const sql = `INSERT INTO Courses 
        (Course_Name, Module_Code, Lecturer_Assigned) 
        VALUES (?, ?, ?)`;
    db.query(sql, [
        course.Course_Name, 
        course.Module_Code, 
        course.Lecturer_Assigned
    ], (err, result) => {
        if (err) {
            console.error("Error adding course:", err);
            return res.status(500).send("❌ Error saving course.");
        }
        res.send("✅ Course added and lecturer assigned successfully!");
    });
});

app.get("/courses", (req, res) => {
    db.query("SELECT * FROM Courses", (err, results) => {
        if (err) return res.status(500).send("❌ Error fetching courses.");
        res.send(results);
    });
});


app.post("/students/register", (req, res) => {
  const { Full_Names, Email, Password } = req.body;
  const sql = "INSERT INTO Students (Full_Names, Email, Password) VALUES (?, ?, ?)";
  db.query(sql, [Full_Names, Email, Password], (err, result) => {
    if (err) return res.status(500).send("❌ Error registering student");
    res.send({ message: "✅ Student registered successfully!" });
  });
});

app.post("/students/login", (req, res) => {
  const { Email, Password } = req.body;
  const sql = "SELECT * FROM Students WHERE Email = ? AND Password = ?";
  db.query(sql, [Email, Password], (err, results) => {
    if (err) return res.status(500).send("❌ Error logging in");
    if (results.length > 0) {
      res.send({ message: "✅ Login successful!", student: results[0] });
    } else {
      res.status(401).send("❌ Invalid email or password");
    }
  });
});

app.get("/students/:studentId/monitoring", (req, res) => {
    const studentId = req.params.studentId;


    const sql = `
        SELECT
            SUM(CASE WHEN md.Attendance = 1 THEN 1 ELSE 0 END) AS attended,
            COUNT(md.Course_Code) AS totalLectures,
            mg.Course_Name AS latestCourse,
            mg.Grade AS latestGrade
        FROM MonitoringData md
        LEFT JOIN (
            SELECT Course_Name, Grade, StudentID
            FROM MonitoringData
            WHERE StudentID = ? AND Grade IS NOT NULL
            ORDER BY Date DESC
            LIMIT 1
        ) mg ON md.StudentID = mg.StudentID
        WHERE md.StudentID = ?
        GROUP BY mg.Course_Name, mg.Grade
    `;
    
    const mockData = {
        totalLectures: 30,
        attended: 25,
        attendanceRate: 83,
        latestGrade: { course: "Database Systems", grade: "A-" }
    };

    db.query(sql, [studentId, studentId], (err, results) => {
        if (err) {
            console.error("Monitoring Data Query Error:", err);
            return res.json(mockData); 
        }

        if (results.length > 0) {
            const result = results[0];
            const attended = result.attended || 0;
            const totalLectures = result.totalLectures || 0;
            
            const data = {
                attended: attended,
                totalLectures: totalLectures,
                attendanceRate: totalLectures > 0 ? Math.round((attended / totalLectures) * 100) : 0,
                latestGrade: { 
                    course: result.latestCourse || 'N/A', 
                    grade: result.latestGrade || 'N/A' 
                }
            };
            res.json(data);
        } else {
            res.json(mockData); 
        }
    });
});

app.post("/ratings", (req, res) => {
    const { studentId, lecturer, rating, comments } = req.body;
    

    const sql = `
        INSERT INTO Ratings (StudentID, Lecturer, Rating_Value, Comments) 
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [studentId, lecturer, rating, comments], (err, result) => {
        if (err) {
            console.error("Rating Submission Error:", err);
            return res.status(500).send({ message: "❌ Error submitting rating to the database." });
        }
        res.send({ message: "✅ Rating submitted successfully!" });
    });
});


app.post("/reports", (req, res) => {
  const report = req.body;
  const sql = `INSERT INTO reports 
    (Faculty_Name, Class_Name, Week, Date_of_Lecture, Course_Name, Course_Code, Lecturer_Name, Students_Present, Total_Students_Registered, Class_Venue, Lecture_Time, Topic_Taught, Learning_Outcomes, Recommendations) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [
    report.Faculty_Name,
    report.Class_Name,
    report.Week,
    report.Date_of_Lecture,
    report.Course_Name,
    report.Course_Code,
    report.Lecturer_Name,
    report.Students_Present,
    report.Total_Students_Registered,
    report.Class_Venue,
    report.Lecture_Time,
    report.Topic_Taught,
    report.Learning_Outcomes,
    report.Recommendations
  ], (err, result) => {
    if (err) return res.status(500).send("❌ Error saving report");
    res.send({ message: "✅ Report saved successfully!" });
  });
});

app.get("/reports", (req, res) => {
  db.query("SELECT * FROM reports", (err, results) => {
    if (err) return res.status(500).send("❌ Error fetching reports");
    res.send(results);
  });
});


app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});