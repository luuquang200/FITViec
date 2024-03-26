
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const Resume = sequelize.define('Resume', {
  ResumeId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  JobSeekerId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ResumeTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ResumeContent: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CreatedAt: {
    type: DataTypes.STRING,
    allowNull: false
  },
  UpdateAt: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
module.exports = Resume;
