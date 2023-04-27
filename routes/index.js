const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index');

router.get('/', (req, res) => {
    res.render('index');
});
router.post('/register', indexController.handleRegistration);

module.exports = router;