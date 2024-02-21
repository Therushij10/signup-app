const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection setup
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rushi123',
  database: 'rushi'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route for signing up
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  connection.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error signing up: ' + err.message);
      res.status(500).send('Error signing up.');
      return;
    }
    console.log('User signed up successfully.');
    res.send('Signed up successfully.');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
