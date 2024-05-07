const express = require('express');
const bcrypt = require('bcrypt');
const database = require('./database');

const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.post('/', (req, res) => {
  const { name, password } = req.body;

  database.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    connection.query('SELECT * FROM user WHERE name = ?', [name], (err, results) => {
      if (err) {
        connection.release();
        console.error('Error executing SQL query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (results.length === 0) {
        connection.release();
        res.status(401).send('User not found');
        return;
      }

      const user = results[0];
      const hashPass = /^\$2y\$/.test(user.password_hash) ? '$2b$' + user.password_hash.slice(4) : user.password_hash;

      bcrypt.compare(password, hashPass, (err, match) => {
        connection.release();
        if (err) {
          console.error('Error comparing passwords:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        if (match) {
          // Store user data in session
          req.session.user = { username: user.name };
          res.status(200).redirect('/success-2.html');
        } else {
          res.status(401).send('Invalid credentials');
        }
      });
    });
  });
});

module.exports = router;
