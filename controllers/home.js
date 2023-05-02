const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet'); // Import the Mongoose model for tweets
const User = require('../models/User'); // Import the Mongoose model for users

const createTweet = async (req, res) => {
    try {
        const { tweetText } = req.body;
        // Find the user object for the logged-in user
        const user = await User.findOne({ username: req.params.username });
        console.log(req.params);
        // if (!user) {
        //     throw new Error('User not found');
        // }
        console.log(user);
        // Create a new tweet object with the populated author field
        const tweet = new Tweet({
            tweetText: tweetText,
            author: user._id,
            authorUsername: user.username,
        });
        console.log('tweet.author:', tweet.author);
        await tweet.save();
        console.log('tweet created');

        res.redirect(`/home/${user.username}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const deleteTweet = async (req, res) => {
    try {
        const { tweetId } = req.params;
        await Tweet.findOneAndDelete({ _id: tweetId });
        res.redirect(`/home/${req.params.username}`);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const tweetLikes = async (req, res) => {
    try {
        const tweetId = req.params.id;
        const tweet = await Tweet.findById(tweetId); //Finds the tweet to like
        const user = req.user;

        if (tweet.likes.includes(user.id)) {
            // removes like if user already liked tweet
            tweet.likes.pull(user.id);
        } else {
            // adds like if user has not liked tweet
            tweet.likes.push(user.id);
        }

        await tweet.save();

        res.redirect('/home');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}


module.exports = {
    createTweet,
    deleteTweet,
}