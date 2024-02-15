// database.js

const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  // Your database configuration here
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'p@ssw0rd',
  database: 'login_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to get a connection from the pool
function getConnection(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error getting connection from pool:', err);
      callback(err, null);
      return;
    }
    callback(null, connection);
  });
}

module.exports = {
  getConnection
};
