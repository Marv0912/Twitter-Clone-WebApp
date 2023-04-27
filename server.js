// require dependencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/home');
const indexRoutes = require('./routes/index');

// initialize express application
const app = express();

// configure application settings
app.set('view engine', 'ejs');

// mount middlware
app.use(logger('dev'));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
// mount routes
app.use('/home', homeRoutes)
app.use('/', indexRoutes);

// tell the application to listen for requests
app.listen(3000, () => {
    console.log('express is listening on port:3000');
});