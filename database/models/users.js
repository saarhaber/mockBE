const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../db');
const saltRounds = 10;

const Users = db.define("Users", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    get() {
      return () => this.getDataValue("password");
    }
  },
  salt : {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue("salt");
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "http://i.imgur.com/AItCxSs.jpg"
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  organization: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  profession: {
    type: Sequelize.STRING
  },
  interviewAmount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  lastInterview: {
    type: Sequelize.DATE,
  },
  isInterviewer: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  googleId: {
    type: Sequelize.STRING
  }
});

Users.generateSalt = async () => {
  try { 
    return await bcrypt.genSalt(saltRounds);
  } catch (err) {
    console.log(err);
  }
}

Users.encryptPassword = async (plaintext, salt) => {
  try {
    return await bcrypt.hash(plaintext, salt);
  } catch (err) {
    console.log(err);
  }
}

Users.prototype.correctPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password());
  } catch (err) {
    console.log(err);
  }
}

const setSaltandPassword = async user => {
  try {
    if (user.changed("password")) {
    user.salt = await Users.generateSalt();
    user.password = await Users.encryptPassword(user.password(), user.salt())
   }
  } catch (err) {
    console.log(err);
  }
};

Users.beforeCreate(setSaltandPassword);
Users.beforeUpdate(setSaltandPassword);

module.exports = Users;