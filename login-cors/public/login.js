const express = require('express');
const bcrypt = require('bcrypt');
const database = require('./database');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, password } = req.body;

  const sql = 'SELECT * FROM user WHERE name = ?';
  database.query(sql, [name], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(401).send('User not found');
      return;
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (result) {
        // Passwords match, authentication successful
        res.status(200).send('Login successful');
      } else {
        // Passwords don't match
        res.status(401).send('Invalid credentials');
      }
    });
  });
});

module.exports = router;
