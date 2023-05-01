// require dependencies
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const homeRoutes = require('./routes/home');
const indexRoutes = require('./routes/index');
const User = require('./models/User');
const flash = require('connect-flash');

// initialize express application
const app = express();

app.set('view engine', 'ejs');

require('dotenv').config();
require('./config/database');

app.use(session({
    secret: 'marvin bridget',
    resave: false,
    saveUninitialized: false
}));
app.use(flash()); //
// Passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// mount middlware
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use('/', indexRoutes);
app.use('/home', homeRoutes);

app.get('/', (req, res) => {
    res.redirect('/login');
});


// tell the application to listen for requests
app.listen(3000, () => {
    console.log('express is listening on port:3000');
});