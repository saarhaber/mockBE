const users = [
  {
    firstName: "Ajani",
    lastName: "Stewart",
    imageUrl: null,
    email: "email@email.com",
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
    imageUrl: 'http://3.bp.blogspot.com/-hrebbdHVnMs/T_xetr5DAHI/AAAAAAAAAzo/CODjoTjZh7Y/s1600/cat+10.jpg',
    email: "john@cline.com",
    organization: "Google",
    description: "Big Brain",
    profession: "web developer",
    interviewAmount: 10,
    lastInterview: (Date.now()/1000),
    isInterviewer: true
  },
  {
    firstName: "Kim",
    lastName: "Wong",
    imageUrl: null,
    email: "kim.wong@email.com",
    organization: "Bloomberg",
    description: "Bigger Brain",
    profession: "software engineer",
    interviewAmount: 8,
    lastInterview: (Date.now()/1000),
    isInterviewer: true
  }
]

module.exports = users;