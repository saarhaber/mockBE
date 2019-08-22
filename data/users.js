const Users = [
  {
    firstName: "Ajani",
    lastName: "Stewart",
    password: "cats1",
    email: "ajani@email.com",
    organization: "Hunter College",
    description: "Student Web Developer paitentily waiting for the heat death of the universe",
    profession: "student",
    imageUrl: "https://avatars2.githubusercontent.com/u/20689354?s=400&v=4",
    interviewAmount: 3,
    lastInterview: (new Date()).toISOString(),
    isInterviewer: false,
    linkedInLink:"https://www.linkedin.com/in/ajani-stewart/",
    githubLink:"https://github.com/AjaniStewart"
  },
  {
    firstName: "John",
    lastName: "Cline",
    password: 'cats2',
    imageUrl: 'https://avatars2.githubusercontent.com/u/2057878?s=400&v=4',
    email: "rmahdiur@gmail.com",
    organization: "Google",
    description: "Big Brain",
    profession: "Web Developer",
    interviewAmount: 10,
    lastInterview: (new Date()).toISOString(),
    isInterviewer: true,
    linkedInLink:"https://www.linkedin.com/in/clinejj/",
    githubLink:"https://github.com/clinejj"
  },
  {
    firstName: "Kim",
    lastName: "Wong",
    password: 'cats3',
    email: "kim.wong@email.com",
    organization: "Bloomberg",
    description: "Bigger Brain",
    profession: "Software Engineer",
    interviewAmount: 8,
    lastInterview: (new Date()).toISOString(),
    isInterviewer: true,
    linkedInLink:"https://www.linkedin.com/in/kim-wong-3aa5905a/",
    githubLink:"https://github.com/kimsonwong"
  }
]

module.exports = Users;