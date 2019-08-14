const User = require('./users')
const Interview = require('./dashboard')

Interview.belongsTo(User, { as: "Interviewer", foreignKey: "interviewerId"});
Interview.belongsTo(User, { as: "Student", foreignKey: "studentId"});

User.hasMany(Interview, { as: "Interviewer", foreignKey: "interviewerId"});
User.hasMany(Interview, { as: "Student", foreignKey: "studentId"});

module.exports = {User, Interview}