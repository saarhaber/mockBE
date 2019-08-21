const Users = [
  {
    firstName: "Ajani",
    lastName: "Stewart",
    password: "$2b$10$AzDRVH.Pk1up/RoSG7GnpOeWf59S3xnkf739lKE1k0wyyckG9E3zi",
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
    password: "$2b$10$MzM3xH9XyARzUtjqyavNIuFuMtMej0tnj.TGmoYHpHSFg3V2ve9K2",
    imageUrl: 'http://3.bp.blogspot.com/-hrebbdHVnMs/T_xetr5DAHI/AAAAAAAAAzo/CODjoTjZh7Y/s1600/cat+10.jpg',
    email: "rmahdiur@gmail.com",
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
    password: "$2b$10$89i.NvRyTKh932n8AGjTMugJ95kDcQdiStq2Qso8g70n/CRZlaoSG",
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