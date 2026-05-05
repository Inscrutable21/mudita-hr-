const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Create table if not exists
db.query(`
  CREATE TABLE IF NOT EXISTS applicants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    mobile_number VARCHAR(20),
    email_id VARCHAR(255),
    applying_for_position VARCHAR(255),
    state VARCHAR(100),
    city VARCHAR(100),
    location VARCHAR(255),
    dob DATE,
    age INT,
    gender ENUM('Male', 'Female', 'Other'),
    total_experience VARCHAR(50),
    relevant_experience VARCHAR(50),
    current_salary VARCHAR(50),
    expected_salary VARCHAR(50),
    qualification VARCHAR(255),
    notice_period VARCHAR(100),
    resume_link TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) console.error("Table creation error:", err.message);
  else console.log("Table 'applicants' ready.");
});

// Webhook: Google Apps Script will POST data here
app.post("/webhook", (req, res) => {
  const {
    full_name, mobile_number, email_id, applying_for_position,
    state, city, location, dob, age, gender,
    total_experience, relevant_experience, current_salary,
    expected_salary, qualification, notice_period, resume_link
  } = req.body;

  const sql = `
    INSERT INTO applicants 
    (full_name, mobile_number, email_id, applying_for_position, state, city, location, dob, age, gender, total_experience, relevant_experience, current_salary, expected_salary, qualification, notice_period, resume_link)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    full_name, mobile_number, email_id, applying_for_position,
    state, city, location, dob, age, gender,
    total_experience, relevant_experience, current_salary,
    expected_salary, qualification, notice_period, resume_link
  ], (err) => {
    if (err) {
      console.error("Insert error:", err.message);
      return res.status(500).json({ error: "Failed to save data" });
    }
    res.json({ success: true });
  });
});

// GET: Frontend fetches all applicants
app.get("/applicants", (req, res) => {
  db.query("SELECT * FROM applicants ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to fetch data" });
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
