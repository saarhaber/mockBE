const Interview_routes = require('express').Router()
const {Interviews} = require('../database/models')

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

Interview_routes.put("/:id", async (req, res) => {
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

module.exports = Interview_routes