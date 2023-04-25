const tweet = require('./models/tweet'); // Import the Mongoose model for tweets
const user = require('./models/user'); // Import the Mongoose model for users
const userIds = [...following, user._id]; // Include user's ID to the list of users ID
const express = require('express'); // Import Express
const router = express.Router(); // Create a new router object
const ejs = require('ejs'); // Import EJS
const { log } = require('console');

const displayTweets = async (req, res) => {
    try {
      const user = req.user; // Get the currently logged-in user from the request object (if available)
      const following = user.following; // Get the user's list of following users
      const tweets = await tweet.find({ userId: { $in: following } }).populate('userId').sort({ createdAt: -1 }); // Find tweets posted by users the current user is following, sort by most recent

      // Render the home page EJS template and pass in the tweets and user objects
        res.render('home', { tweets, user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

const createTweet = async(req, res) => {
    try {
        //destructuring, you can use the variable tweetText to search for it instead
        // of utilizing req.body.tweetText whenever needed
        const { tweetText } = req.body;
        const tweet = new Tweet({ tweetText, userId: req.user._id });

        await tweet.save(); // saves the tweet document in the database

        res.redirect('/home'); // goes to home page to see user tweet
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const tweetLikes = async (req, res) => {
    try {
        const tweet = await Tweet.findbyId(req.params.tweetId); //Finds the tweet to like
        const user = req.user;

        if(tweet.likes.includes(user._id)) {
            // removes like if user already liked tweet
            tweet.like.pull(user._id);
        } else {
            // adds like if user has not liked tweet
            tweet.like.push(user._id);
        }

        await tweet.save();

        //res.redirect(`/tweets/${tweet._id}`)
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

module.exports = {
    displayTweets,
    createTweet,
    tweetLikes,
}