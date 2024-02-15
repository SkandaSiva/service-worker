const express = require('express');
const bcrypt = require('bcrypt');
const database = require('./database');

const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const sql = 'INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)';
    database.query(sql, [name, email, hash], (err, results) => {
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      // Registration successful
      res.status(200).send('Registration successful');
    });
  });
});

module.exports = router;
