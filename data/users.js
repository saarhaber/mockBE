const Users = [
  {
    firstName: "Ajani",
    lastName: "Stewart",
    password: "cats1",
    email: "ajani@email.com",
    organization: "Hunter College",
    description: "Student Web Developer paitentily waiting for the heat death of the universe",
    profession: "student",
    interviewAmount: 3,
    lastInterview: (new Date()).toISOString(),
    isInterviewer: false
  },
  {
    firstName: "John",
    lastName: "Cline",
    password: 'cats2',
    imageUrl: 'http://3.bp.blogspot.com/-hrebbdHVnMs/T_xetr5DAHI/AAAAAAAAAzo/CODjoTjZh7Y/s1600/cat+10.jpg',
    email: "mockupdispatch@gmail.com",
    organization: "Google",
    description: "Big Brain",
    profession: "web developer",
    interviewAmount: 10,
    lastInterview: (new Date()).toISOString(),
    isInterviewer: true
  },
  {
    firstName: "Kim",
    lastName: "Wong",
    password: 'cats3',
    email: "kim.wong@email.com",
    organization: "Bloomberg",
    description: "Bigger Brain",
    profession: "software engineer",
    interviewAmount: 8,
    lastInterview: (new Date()).toISOString(),
    isInterviewer: true
  }
]

module.exports = Users;