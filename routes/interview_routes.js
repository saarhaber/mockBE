const Interview_routes = require('express').Router()
const {Interviews, Users} = require('../database/models')
const nodemailer = require('nodemailer')

Interview_routes.get('/', (req, res) => {
    Interviews.findAll()
    .then(data => res.send(data))
})

//get all booked interviews
Interview_routes.get("/booked", async (req, res, next) => {
  try {
    const booked = await Interviews.findAll({
      where: {
        isBooked: true
      }
    });
    if (booked) {
      res.status(200).send(booked);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
});

Interview_routes.get("/unbooked", async (req,res,next) => {
  try {
    const unbooked = await Interviews.findAll({
      where: {
        isBooked: false
      }
    });
    if (unbooked) {
      res.status(200).send(unbooked);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
});

//get all interviews by user
Interview_routes.get('/:id', async (req, res) => {
    await Interviews.findByPk(req.params.id)
    .then(interview => res.send(interview))
    .catch(err => console.log(err))
})

Interview_routes.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const new_interview = await Interviews.create({
        dateCreated: req.body.dateCreated,
        isBooked: false,
        feedback: req.body.feedback,
        interviewLocation: req.body.interviewLocation,
        extraInfo: req.body.extraInfo,
        interviewDate: req.body.interviewDate,
        interviewTime: req.body.interviewTime,
        interviewerId: req.body.interviewerId,
        studentId: req.body.studentId
    });
    res.status(201).send(new_interview);
  } catch (err) {
    next(err);
  }
});

// This function can be used to send emails
sendEmail = async (to, subject, message) => {
  console.log("Running initialNotification")
  // let testAccount = await nodemailer.createTestAccount();

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'mockupdispatch@gmail.com',
           pass: 'Mockupdispatch96'
       }
  });

  const mailOptions = {
    from: 'mockupdispatch@gmail.com', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    html: `<p>${message}</p>`// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });
}

// version with email
Interview_routes.put("/:id", async (req, res) => {
  const interview = await Interviews.findByPk(req.params.id)
  if (interview) {
    // this conditional needs to be changed so it only activates when an interview is booked. this can be checked by the following statement: (interview.isBooked == false) && (req.body.isBooked == true)
    if (true) {
      await interview.update({
        dateCreated: req.body.dateCreated,
        isBooked: req.body.isBooked,
        feedback: req.body.feedback,
        interviewLocation: req.body.interviewLocation,
        extraInfo: req.body.extraInfo,
        interviewDate: req.body.interviewDate,
        interviewTime: req.body.interviewTime
      })
      // interview student id must be changed like so. This is because it is a foreign key
      .then(() => interview.setStudent(req.body.studentId))
      // find interviewer and send email
      .then(async () => {
        console.log("Inside interviewer email function")
        const interviewer = await Users.findByPk(interview.interviewerId)
        
        const message = 
        `Hi ${interviewer.firstName}<br><br>
        You have an interview with a student. Here is the interview description:<br><br>
        ${interview.extraInfo}<br><br>
        Thanks so much for volunteering!<br>
        Sincerely,<br>
        The MockUp Team<br>`

        sendEmail(interviewer.email, "MOCKUP: Interview", message)

        return interviewer
      })
      // find student and send email
      .then(async interviewer => {
        console.log("Inside student email function")
        const student = await Users.findByPk(interview.studentId)
        
        const message = 
        `Hi ${student.firstName}<br><br>
        You have an interview with ${interviewer.firstName} ${interviewer.lastName}. Here is the interview description:<br><br>
        ${interview.extraInfo}<br><br>
        Good luck, you're gonna do great!<br>
        Sincerely,<br>
        The MockUp Team<br>`

        sendEmail(student.email, "MOCKUP: Interview", message)

        res.send({
          interview,
          interviewer,
          student
        })
      })
      .catch(err => {
        console.log(err)
        res.send(err)
      })
    }
    // res.send(interview)
  }
  else {
    res.send({
      found: false,
      message: "ERROR: Could not find interview in database"
    })
  }
})

Interview_routes.delete('/:id', async (req, res, next) => {
  try {
    let numDeleted = await Interviews.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!numDeleted) {
      res.status(404).send(`Interview does not exist`);
    } else {
      res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
})

module.exports = Interview_routes