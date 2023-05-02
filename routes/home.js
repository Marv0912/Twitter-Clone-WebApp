const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const homeRenderController = require('../controllers/homeRender');

//todo: edit route GET with button

router.get('/:username', homeRenderController.renderHome);

// router.get('/home/new', (req, res) => {
//     res.render('new');
// });

router.post('/:username', homeController.createTweet);

router.delete('')

router.put('')
// router.post('/tweets/:id/like', homeController.tweetLikes);


module.exports = router;
//router.get('/home', homeController.displayTweets);

// TODO: remember to place path and to put route on server.js
// router.post('/??', homeController.tweetLikes);