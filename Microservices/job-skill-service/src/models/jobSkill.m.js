
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const JobSkill = sequelize.define('JobSkill', {
  JobId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SkillId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SkillLevel: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
module.exports = JobSkill;
