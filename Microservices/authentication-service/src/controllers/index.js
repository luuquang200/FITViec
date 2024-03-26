// controllers/home.c.js
const Application = require('../models');
const sequelize = require('../config/db');

class Controller {
  getHomePage = async (req, res, next) => {
      try {
        res.status(200).json({ message: 'Hello world!' });
      } catch (error) {
        next(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
}

module.exports = new Controller();
