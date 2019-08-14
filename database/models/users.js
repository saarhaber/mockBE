const Sequelize = require('sequelize');
const db = require('../db');

const Users = db.define("Users", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "http://i.imgur.com/AItCxSs.jpg"
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  organization: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  profession: {
    type: Sequelize.STRING
  },
  interviewAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  lastInterview: {
    type: Sequelize.DATE,
  }

});

module.exports = Users;