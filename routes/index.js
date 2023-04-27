const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

router.get('/', indexController.handleRegistration);

module.exports = router;