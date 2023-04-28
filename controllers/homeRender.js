const Tweet = require('../models/Tweet');

exports.renderHome = async (req, res) => {
    try {
        const tweets = await Tweet.find();
        res.render('home/index', { tweets: tweets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching tweets');
    }
};