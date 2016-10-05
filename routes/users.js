//user routes
var
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router();

userRouter.route('/login')
    .get(function(req, res){
      res.render('login')
    })
    /*create session using passport*/
    .post(passport.authenticate('local-login', {
      successRedirect: '/profile',
      failureRedirect: '/login'
    }))

userRouter.route('/signup')
    .get(function(req, res){
      res.render('signup')
    })
    /*create account using passport*/
    .post(passport.authenticate('local-signup', {
      successRedirect: '/profile',
      failureRedirect: '/signup'
    }))


//isLoggedIn: filter, middleware
userRouter.get('/profile', isLoggedIn, function(req, res) {
  //render the user profile
  res.render('profile', {user: req.user})
})

userRouter.get('/logout', function(req, res){
  //destroy the session and redirect to the home page...
  req.logout()
  res.redirect('/')
})

//creating a middle ware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/')
}

module.exports = userRouter
