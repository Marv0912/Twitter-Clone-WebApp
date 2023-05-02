const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home');
const homeRenderController = require('../controllers/homeRender');

router.get('/:username', homeRenderController.renderHome);

router.post('/:username', homeController.createTweet);

router.delete('/:username/:tweetId', homeController.deleteTweet)


module.exports = router;
