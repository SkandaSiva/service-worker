// logout.js

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    // Clear session data
    delete req.session;
    res.redirect('/index.html')
});

module.exports = router;
