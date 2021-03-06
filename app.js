var
	express = require('express'),
	app = express(),
	ejs = require('ejs'),
	ejsLayouts = require('express-ejs-layouts'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),//flash message
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),//like first bouncer//look fir cookie on every incoming
	bodyParser = require('body-parser'),
	session = require('express-session'),//generate cookies
	passport = require('passport'),
	passportConfig = require('./config/passport'),
	userRoutes = require('./routes/users'),
	User = require('./models/User')

// environment port
var port = process.env.PORT || 3000

// mongoose connection
mongoose.connect('mongodb://localhost/passport-authentication', function(err){
	if(err) return console.log('Cannot connect :(')
	console.log('Connected to MongoDB. Sweet!')
})

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(session({
	//create cookies on request
	secret: 'boom',//this makes cookie unique to application
	cookie: {maxAge: 6000000}, //set timer for page remain logged in
	resave: true, //reset timer once an action is done in the page
	saveUninitialized: false //
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//create a middleware to add a current user to be available in every view; view logged in user in terminal backend
app.use(function(req, res, next){
//req.app.locals is express; this makes currentUser/loggedIn to be available in view
	if(req.user) req.app.locals.currentUser = req.user
	req.app.locals.loggedIn = !!req.user
	next();
})

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//root route
app.get('/', function(req,res){
	res.render('index')
})

//all users routes:
app.use('/', userRoutes)

app.listen(port, function(){
	console.log("Server running on port", port)
})
