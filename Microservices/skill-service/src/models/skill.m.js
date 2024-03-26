
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const Skill = sequelize.define('Skill', {
  SkillId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  SkillName: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
});
module.exports = Skill;
