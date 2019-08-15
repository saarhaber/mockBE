const Sequelize = require('sequelize');
const db = require('../db');

const Interviews = db.define("Interviews", {
  // interviewerId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
  // studentId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false
  // },
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