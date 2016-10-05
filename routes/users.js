//user routes
var
  express = require('express'),
  passport = require('passport'),
  userRouter = express.Router();

userRouter.route('/login')
    .get(function(req, res){
      res.render('login')
    })
    .post(/*create session using passport*/)

userRouter.route('/signup')
    .get(function(req, res){
      res.render('signup')
    })
    .post(/*create account using passport*/)


//isLoggedIn: filter, middleware
userRouter.get('/profile', isLoggedIn, function(req, res) {
  //render the user profile
})

//creating a middle ware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
}

module.exports = userRouter
