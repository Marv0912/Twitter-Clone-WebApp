const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

router.get('/register', (req, res) => {
    res.render('index');
});
router.post('/register', indexController.handleRegistration);

router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', indexController.login);

router.get('/logout', indexController.logout);
module.exports = router;