const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes and specify allowed methods
app.use(cors());

// Set Access-Control-Allow-Methods header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'ngrok-skip-browser-warning');
  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Require login and register routers
const loginRouter = require('./public/login');
const registerRouter = require('./public/register');
const logoutRouter = require('./public/logout');

app.use((req, res, next) => {
  // Add ngrok-skip-browser-warning header with value '1'
  res.setHeader('ngrok-skip-browser-warning', '1');
  // Or add custom User-Agent header
  res.setHeader('User-Agent', 'Custom User Agent String');
  next();
});

// Use login and register routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
