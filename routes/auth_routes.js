const express = require('express');
const passport = require('passport');
const { Users } = require('../database/models');

const router = express.Router();

router.post('/login', (req,res,next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) { return res.send(info); }
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login') }
    req.logIn(user, err => {
      if(err) { return next(err); }
      console.log(`USER ${user.firstName} has logged in!`);
      return res.redirect(`../users/${user.id}`);
    })
  })(req,res,next);
});

router.post('/signup', async (req,res,next) => {
  try {
    const user = await Users.create(req.body);
    req.logIn(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req,res) => {
  req.logOut();
  req.session.destroy();
  res.redirect("/");
});

router.get('/me', (req,res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).send("Not logged in");
  }
});

module.exports = router;


