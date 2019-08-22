const express = require('express');
const { Users } = require('../database/models');

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(401).send("Wrong username and/or password");
    }
    else if (!await user.correctPassword(req.body.password)) {
      res.status(401).send("Wrong username and/or password");
    }
    else {
      req.login(user, err => {
        (err ? next(err) : res.json(user))
      });
    }
  }
  catch (err) {
    next(err);
  }
});

router.post('/signup', async (req,res,next) => {
  try {
    const user = await Users.create(req.body);
    req.logIn(user, err => (err ? next(err) : res.status(201).json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req,res) => {
  if (req.isAuthenticated()) {
    console.log(`USER ${req.user.firstName} is logging out!`);
    req.logOut();
    req.session.destroy();
    res.redirect("/");
  } else {
    res.status(401).send("Not logged in");
  }
});

router.get('/me', (req,res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).send("Not logged in");
  }
});

module.exports = router;


