const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const loginRouter = require('./public/login');
const logoutRouter = require('./public/logout');
const registerRouter = require('./public/register');

const app = express();
const router = express.Router();
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

// Configure session middleware
app.use(session({
  secret: 'p@ssw0rd',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: true,
    secure: false
    // secure: process.env.Node_ENV == 'production'
  }
}));

// Redirect /public/login.html to /login
app.get('/public/login.html', (req, res) => {
  res.redirect('/login');
});

// Define routes
router.get("/", (req, res) => {
  res.sendFile("index.html", {root: "./public"});
});

router.get("/register", (req, res) => {
  res.sendFile("register.html", {root: "./public"});
});

router.get("/login", (req, res) => {
  res.sendFile("login.html", {root: "./public"});
});

// Handle login form submission
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter)

// Use router middleware
app.use('/', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
