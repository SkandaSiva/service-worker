// register.js (and login.js if you have one)

const express = require('express');
const bcrypt = require('bcrypt');
const database = require('./database'); // Import database module

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name) {
    return res.status(400).send('Name is required');
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).send('Valid email is required');
  }

  if (!password || password.length < 8 || !/\d/.test(password)) {
    return res.status(400).send('Password must be at least 8 characters and contain at least one number');
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Internal Server Error');
    }

    const sql = 'INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)';
    
    // Get a connection from the pool
    database.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        return res.status(500).send('Internal Server Error');
      }

      // Execute the SQL query on the obtained connection
      connection.query(sql, [name, email, hash], (err, results) => {
        connection.release(); // Release the connection

        if (err) {
          console.error('Error executing SQL query:', err);
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send('Email already taken');
          } else {
            return res.status(500).send('Internal Server Error');
          }
        }

        // Registration successful
        res.redirect('/success.html');
      });
    });
  });
});

module.exports = router;
