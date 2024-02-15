const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Require login and register routers
const loginRouter = require('./public/login');
const registerRouter = require('./public/register');

// Use login and register routes
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
