const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const express = require('express');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors());  // Enable CORS for frontend-backend communication
app.use(express.json()); // 🚀 Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses form data

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Yashu@9441',  // Set your MySQL password if required
    database: 'users_db'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Signup Route
app.post('/signup', (req, res) => {
    const { name, phone, email, dob, address, password } = req.body;

    if (!name || !phone || !email || !dob || !address || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const checkEmailSql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
    db.query(checkEmailSql, [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results[0].length > 0) {
            return res.status(400).json({ error: "Email already registered. Try another one." });
        }

        // If email doesn't exist, insert new user
        const insertSql = "INSERT INTO users (name, phone, email, dob, address, password) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(insertSql, [name, phone, email, dob, address, password], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Email already registered. Try another one." });
                } else {
                    console.error('Error inserting user:', err);
                    return res.status(500).json({ error: "Database error" });
                }
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
