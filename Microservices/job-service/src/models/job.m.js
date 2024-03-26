
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const Job = sequelize.define('Job', {
  JobId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  EmployerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  JobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  JobDescription: {
    type: DataTypes.STRING,
    allowNull: false
  },
  JobLocation: {
    type: DataTypes.STRING,
    allowNull: false
  },
  JobType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  JobCategory: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Salary: {
    type: DataTypes.STRING,
    allowNull: false
  },
  PostedAt: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
module.exports = Job;
