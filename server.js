const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rushi123',
  database: 'user',
});

// Connect to MySQL
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Routes
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  // Example query to insert user into 'users' table
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating user' });
    } else {
      console.log('User created successfully');
      res.status(200).json({ message: 'User created successfully' });
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
