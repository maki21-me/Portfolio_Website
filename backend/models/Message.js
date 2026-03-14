const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Message = sequelize.define('Message', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isReplied: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  replyContent: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Message;
