const express = require('express');
const indexRoutes = require('./routes/index');

const logger = require('morgan');
require('dotenv').config();
require('./config/database');

const app = express();
app.set('view engine', 'ejs');
app.use(logger('dev'));

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

app.use('/', indexRoutes);

app.listen(3000, () => {
    console.log('express is listening on port:3000');
});