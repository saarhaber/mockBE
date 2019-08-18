const Interview_routes = require('express').Router()
const {Interviews, Users} = require('../database/models')

Interview_routes.get('/', (req, res) => {
    Interviews.findAll()
    .then(data => res.send(data))
})

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

//get all booked interviews
Interview_routes.post("/", async (req, res) => {
  try {
    console.log(req.body)
    const new_interview = await Interviews.create({
        dateCreated: req.body.dateCreated,
        isBooked: false,
        feedback: req.body.feedback,
        extraInfo: req.body.extraInfo
    });
    res.status(201).send(new_interview);
  } catch (err) {
    next(err);
  }
});

// version with email
Interview_routes.put("/:id", async (req, res) => {
  const interview = await Interviews.findByPk(req.params.id)
  if (interview) {
    if (true) {
      // change interview details
      // (interview.isBooked == false) && (req.body.isBooked == true)
      await interview.update({
        dateCreated: req.body.dateCreated,
        isBooked: req.body.isBooked,
        feedback: req.body.feedback,
        interviewLocation: req.body.interviewLocation,
        extraInfo: req.body.extraInfo,
        interviewDate: req.body.interviewDate,
        interviewTime: req.body.interviewTime
      })
      .then(() => interview.setStudent(req.body.studentId))
      // find interviewer and send email
      .then(async () => {
        const interviewer = await Users.findByPk(interview.interviewerId)
        res.send({interview, interviewer})
      })
      // find student and send email
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

/* Interview_routes.put("/:id", async (req, res) => {
    await Interviews.findByPk(req.params.id)
    .then(async campus => {
        if (campus != null) {
            await Interviews.update({
                dateCreated: req.body.dateCreated,
                isBooked: req.body.isBooked,
                feedback: req.body.feedback,
                extraInfo: req.body.extraInfo
            },
            {
                where: {
                    id: req.params.id
                }
            })
            
            console.log(`Entry ${req.params.id} has been updated`)
            await Interviews.findAll()
            .then(data => res.status(200).json())
        }
        else {
            res.send("NO INTERVIEW OF THAT ID")
        }
    })
})
*/

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