var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy
  //LocalStrategy is caps coz this is a constructor
  User = require('../models/User.js')

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user)
  })
})

//PASSPORT LOCAL STRATEGY:
