const express = require('express');
// const passport = require('passport');
const { Users } = require('../database/models');

const router = express.Router();

// router.post('/login', (req,res,next) => {
//   passport.authenticate('local', (err, user, info) => {
//     //console.log("USER", user, "INFO", info)
//     // if (info) { return res.send(info); }
//     if (err) { return next(err); }
//     if (!user) { console.log("ASDASDSAD"); return res.redirect('/login') }
//     // req.logIn(user, err => {
//       console.log('LOGIN SESSION', req.sessionID)
//       req.session.save()
//     //   if(err) { return next(err); }
//       console.log(`USER ${user.firstName} has logged in!`);
//       // res.json(user)
//       console.log("COOKIES", req.headers.cookie);
//       return res.redirect(`../users/${user.id}`);
//     // })
//   })(req,res,next);
// });

// router.post("/login", passport.authenticate('local', { failureRedirect: '/login' }), (req, res, next) => {
//   console.log("HEERE", req.user);
//   res.redirect('../auth/me');
// })

// router.post("/login", (req, res, next) => {
//   passport.authenticate('local', (err, user) => {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.login(user, err => {
//       if (err) { return next(err); }
//       req.session.save();
//       console.log("HELLO")
//       return res.redirect('../me')
//     });
//   })(req,res,next);
// });

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
      // console.log("LOGIN", req.sessionID)
      
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
  // console.log("sadsad",req.isAuthenticated())
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
  console.log("ME SESSION", req.sessionID)
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).send("Not logged in");
  }
});

module.exports = router;


