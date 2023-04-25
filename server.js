// require dependencies
const express = require('express');
const logger = require('morgan');

const indexRoutes = require('./routes/index');

// initialize express application
const app = express();

// configure application settings
app.set('view engine', 'ejs');

// mount middlware
app.use(logger('dev'));
app.use(express.static('public'));

// mount routes
app.use('/', indexRoutes);

// tell the application to listen for requests
app.listen(3000, () => {
    console.log('express is listening on port:3000');
});