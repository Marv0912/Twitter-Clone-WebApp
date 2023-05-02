const Tweet = require('../models/Tweet'); // Import the Mongoose model for tweets
const User = require('../models/User'); // Import the Mongoose model for users
const createTweet = require('./home')

exports.renderHome = async (req, res, tweets) => {
    try {
        console.log(req.params);
        const tweets = await Tweet.find({}).sort({ createdAt: 'desc' });
        res.render('home/index', { tweets, username: req.params.username });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tweets');
    }
};