
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const User = sequelize.define('User', {
  UserId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UserType: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
module.exports = User;
