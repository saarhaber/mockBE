const User_routes = require('express').Router()
// const Users = require('../database/models/users');
const { Interviews, Users } = require('../database/models');
const bcrypt = require('bcrypt')

let loggedIn_id = undefined;

//get logged in user
User_routes.get('/me', async (req, res, next) => {
  if (!loggedIn_id) {
    res.status(401).send("Not logged in");
  }
  try {
    const user = await Users.findOne({
      where: {
        id : loggedIn_id
      }
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User no longer exists");
    }
  } catch (err) {
    next(err);
  }
})

// logout user
User_routes.delete('/me', async (req, res, next) => {
  if (!loggedIn_id) {
    res.status(401).send("Not logged in");
  }
  loggedIn_id = undefined;
  res.status(200).send("Logged out");
})

// all users
User_routes.get('/', (req, res,next) => {
    Users.findAll()
    .then(data => res.send(data))
    .catch(err => next(err))
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

//get all interviews by a user
User_routes.get('/:id/interviews', async (req,res,next) => {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!user) {
      res.status(404).send()
    }
    let interviews;
    if (user.isInterviewer) {
      interviews = await Interviews.findAll({
        where: {
          interviewerId: req.params.id
        }
      });
    } else {
      interviews = await Interviews.findAll({
        where: {
          studentId: req.params.id
        }
      });
    }
    if (interviews) {
      res.status(200).send(interviews);
    } else {
      res.status(404).send();
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

User_routes.put("/", async (req, res, next) => {
  const identification = req.body
  // Search DB for user by email
  await Users.findOne({
    where: {
      email: identification.email
    }
  }) // error check for if user exists
  .then(user => {
    if (user) {
      return user
    }
    else {
      return {
        email_found: false,
        password_match: false,
        message: "ERROR: Could not find user"
      }
    }
  }) // error check for if password matched
  .then(async (user) => {
    if (user.email_found == false) {
      return user
    }
    else {
      const match = await bcrypt.compare(identification.password, user.password)
      if (match) {
        return user
      }
      else {
        return {
          email_found: true,
          password_match: false,
          message: "ERROR: Password does not match"
        }
      }
    }
  }) // send whatever was passed down (correct object will get passed down, i.e. error-object if not found or password mismatch, user-object if found and password match)
  .then(user => {
    loggedIn_id = user.id;
    res.send(user)
  })
  .catch(err => console.log(err))
})

User_routes.post('/', async (req,res,next) => {
  try {
    // hash and encrypt password
    const modded_req = await bcrypt.hash(req.body.password, 10)
    .then(hash => {
      let dummy = req.body
      dummy.password = hash
      console.log(dummy)
      return dummy
    })

    // actually create new user in table
    const new_user = await Users.create(modded_req);
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