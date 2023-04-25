const Tweet = require('./models/tweet'); // Import the Mongoose model for tweets
const User = require('./models/user'); // Import the Mongoose model for users
const express = require('express'); // Import Express
const router = express.Router(); // Create a new router object
const ejs = require('ejs'); // Import EJS

const displayTweets = async (req, res) => {
    try {
      const user = req.user; // Get the currently logged-in user from the request object (if available)
      const following = user.following; // Get the user's list of following users
      const tweets = await Tweet.find({ userId: { $in: following } }).populate('userId').sort({ createdAt: -1 }); // Find tweets posted by users the current user is following, sort by most recent

      // Render the home page EJS template and pass in the tweets and user objects
        res.render('home', { tweets, user });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    displayTweets,
}