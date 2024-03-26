
const { DataTypes } = require('sequelize');

const sequelize = require('../config/db');
const Notification = sequelize.define('Notification', {
  UserId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NotificationId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Status: {
    type: DataTypes.STRING,
    allowNull: false
  },
});
module.exports = Notification;
