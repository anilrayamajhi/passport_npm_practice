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

//LOCAL SIGNUP:
passport.use('local-signup', new LocalStrategy({
  //value should be same as we set in database; userSchema
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  //findOne() returns first match
  User.findOne({'local.email': email}, function(err, user) {
    //there was a problem
    if(err) return done(err)
    //email is taken
    if(user) return done(null, false)
    // if(password.length < 6) return done(err, false)
    //and flash message can be used to show the password length is less than 6
    //neither of above happens then create user
    var newUser = new User()
    newUser.local.name = req.body.name
    newUser.local.email = email
    newUser.local.password = newUser.generateHash(password)
    newUser.save(function(err) {
      if(err) return console.log(err);
      return done(null, newUser)
    })
  })
}))


//LOCAL LOG-IN:
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done){
  //make sure that user exists, by searching DB:
  User.findOne({'local.email': email}, function(err, user){
    if(err) return done(err)
    //flash would say: "no user found"
    if(!user) return done(null, false)
    //authenticate if the user has passed invalid password
    if(!user.validPassword(password)) return done(null, false)

    return done(null, user);
  })
}))


module.exports = passport
