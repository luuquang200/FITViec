
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const Employer = sequelize.define('Employer', {
  EmployerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CompanyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CompanyDesc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CompanyWebsite: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
module.exports = Employer;
