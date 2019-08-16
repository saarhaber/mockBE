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
  interviewLocation: {
    type: Sequelize.TEXT
  },
  extraInfo: {
    type: Sequelize.TEXT
  },
  interviewDate: {
    type: Sequelize.DATEONLY
  },
  interviewTime: {
    type: Sequelize.TIME
  }
});

module.exports = Interviews;