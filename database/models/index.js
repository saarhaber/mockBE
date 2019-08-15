const Users = require('./users')
const Interviews = require('./interviews')

Interviews.belongsTo(Users, { as: "Interviewer", foreignKey: "interviewerId"});
Interviews.belongsTo(Users, { as: "Student", foreignKey: "studentId"});

Users.hasMany(Interviews, { as: "Interviewer", foreignKey: "interviewerId"});
Users.hasMany(Interviews, { as: "Student", foreignKey: "studentId"});

module.exports = {Users, Interviews}