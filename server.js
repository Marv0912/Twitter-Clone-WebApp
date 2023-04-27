// require dependencies
const express = require('express');
const logger = require('morgan');
const homeRoutes = require('./routes/home');
const indexRoutes = require('./routes/index');

// initialize express application
const app = express();

app.set('view engine', 'ejs');

require('dotenv').config();
require('./config/database');


// configure application settings

// mount middlware
app.use(logger('dev'));
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
// mount routes
app.use('/', indexRoutes);
app.use('/home', homeRoutes)


// tell the application to listen for requests
app.listen(3000, () => {
    console.log('express is listening on port:3000');
});