const Sequelize = require('sequelize');
const db = require('../db');

const Interviews = db.define("Interviews", {
  dateCreated: {
    type: Sequelize.DATE
  },
  isBooked: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  feedback: {
    type: Sequelize.TEXT
  },
  extraInfo: {
    type: Sequelize.TEXT
  }
});

module.exports = Interviews;