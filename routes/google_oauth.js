const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Users } = require('../database/models');

const router = express.Router();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.log("Google client ID / secret not found. Skipping Google OAuth.");
} else {
  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  };

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;

    Users.findOrCreate({ where: { googleId }, defaults: { name, email }})
      .then(([user]) => done(null,user))
      .catch(err => done(err));
  });

  passport.use(strategy);
  router.get('/', passport.authenticate("google", { scope: "email"}));
  router.get('/callback', passport.authenticate('google', {
    successRedirect: `/api/users/${req.user}`,
    failureRedirect: '/api/auth/login'
  }));
}

module.exports = router;

