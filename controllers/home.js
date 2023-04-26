const express = require('express'); 
const router = express.Router(); 
const tweet = require('./models/tweet'); // Import the Mongoose model for tweets
const user = require('./models/user'); // Import the Mongoose model for users
const userIds = [...following, user._id]; // Include user's ID to the list of users ID

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

// TODO: Create followUser & unfollowUser
const followUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).send('You must be logged in to unfollow users');
        }
    } catch {
        const userIdToFollow = req.params.userId;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            //unlike push, addToSet prevents duplicates
            { $addToSet: { following: userIdToFollow } },
            { new: true }
        );
    }
}
const unfollowUser = async (req, res) =>  {
    try {
        if (!req.user) {
            return res.status(401).send('You must be logged in to unfollow users');
        }
    } catch {
        const userIdToUnfollow = req.params.userId;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            //unlike push, addToSet prevents duplicates
            { $pull: { following: userIdToUnfollow } },
            { new: true }
        );
    }
}

// TODO: Retweet function
const retweet = async (req, res) =>  {
    try {
    } catch {

    }
}

// TODO Reply to tweet function
const replyToTweet = async (req, res) =>  {
    try {

    } catch {

    }
}

module.exports = {
    displayTweets,
    createTweet,
    tweetLikes,
    followUser, 
    unfollowUser,
    retweet,
    replyToTweet,
}