const User_routes = require('express').Router()
const Users = require('../database/models/users')

// all users
User_routes.get('/', (req, res,next) => {
    Users.findAll()
    .then(data => res.send(data)).catch(err => next(err))
})

//get all interviewers
User_routes.get('/interviewers', async (req, res, next) => {
  console.log("HERE")
  try {
    const interviewers = await Users.findAll({
      where: {
        isInterviewer: true
      }
    });
    res.status(200).json(interviewers);
  } catch (err) {
    next(err);
  }
});
//get all students
User_routes.get('/students', async (req, res, next) => {
  try {
    const students = await Users.findAll({
      where: {
        isInterviewer: false
      }
    });
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

//get one user by id
User_routes.get('/:id', async (req,res,next) => {
  console.log("ID")
  try {
    const user = await Users.findOne({
      where: {
        id : req.params.id
      }
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("user not found");
    }
  } catch (err) {
    next(err);
  }
});

User_routes.put('/:id', async (req, res, next) => {
  try { 
    const update = req.body;
    console.log("req.body", req.body);
    const modified = await Users.update(update, {
      where: {
        id : req.params.id
      }
    });
    if (modified) {
      res.status(200).send(modified);
    } else {
      res.status(400).send("something bad happened");
    }
  } catch (err) {
    next(err);
  }
});

User_routes.post('/', async (req,res,next) => {
  try {
    const new_user = await Users.create(req.body);
    if (new_user) {
      res.status(201).send(new_user);
    } else {
      res.status(400).send("something went terribly wrong creating new user");
    }
  } catch (err) {
    next(err);
  }
});

User_routes.delete('/:id', async (req,res,next) => {
  try {
    let numDeleted = await Users.destroy({
      where: {
        id : req.params.id
      }
    });
    if (!numDeleted) {
      res.status(404).send(`Does not exist`);
    } else {
      res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
});




module.exports = User_routes;