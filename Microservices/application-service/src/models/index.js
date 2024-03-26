
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const Application = sequelize.define('Application', {
  ApplicationId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  JobId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  JobSeekerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ResumeId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  AppliedAt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
module.exports = Application;
