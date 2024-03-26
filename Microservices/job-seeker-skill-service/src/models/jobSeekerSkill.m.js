
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const JobSeekerSkill = sequelize.define('JobSeekerSkill', {
  JobSeekerSkillId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SkillId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  YearsOfExperience: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
});
module.exports = JobSeekerSkill;
