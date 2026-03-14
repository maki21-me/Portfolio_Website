const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Web App'
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  link: {
    type: DataTypes.STRING
  },
  github: {
    type: DataTypes.STRING
  },
  techStack: {
    type: DataTypes.TEXT, // Will store as JSON string or comma-separated
    get() {
      const rawValue = this.getDataValue('techStack');
      if (!rawValue) return [];
      try {
        return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
      } catch (err) {
        console.warn("⚠️ Invalid techStack JSON in DB:", rawValue);
        return [];
      }
    },
    set(value) {
      this.setDataValue('techStack', JSON.stringify(value));
    }
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Project;
