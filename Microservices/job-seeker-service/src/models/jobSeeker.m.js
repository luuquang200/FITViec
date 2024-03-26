
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const JobSeeker = sequelize.define('JobSeeker', {
  JobSeekerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  FirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  LastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ResumeId: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
module.exports = JobSeeker;
    