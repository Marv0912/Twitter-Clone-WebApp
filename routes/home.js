const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');


router.get('/', (req, res) => {
    res.render('home/index');
});



//router.get('/home', homeController.displayTweets);

// TODO: remember to place path and to put route on server.js
// router.post('/??', homeController.tweetLikes);

module.exports = router;