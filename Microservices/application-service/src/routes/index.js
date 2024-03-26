// routes/index.js
const express = require('express');
const router = express.Router();

// Import controllers
const controllers = require('../controllers');

// Define routes
router.get('/', controllers.getHomePage);

module.exports = router;
