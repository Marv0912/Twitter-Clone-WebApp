const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet'); // Import the Mongoose model for tweets
const User = require('../models/User'); // Import the Mongoose model for users

const createTweet = async (req, res) => {
    try {
        const { tweetText } = req.body;
        // Find the user object for the logged-in user
        const user = await User.findOne({username: req.params.username});
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

// const followUser = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).send('You must be logged in to unfollow users');
//         }
//     } catch {
//         const userIdToFollow = req.params.userId;

//         const user = await User.findByIdAndUpdate(
//             req.user._id,
//             //unlike push, addToSet prevents duplicates
//             { $addToSet: { following: userIdToFollow } },
//             { new: true }
//         );
//     }
// }
// const unfollowUser = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).send('You must be logged in to unfollow users');
//         }
//     } catch {
//         const userIdToUnfollow = req.params.userId;

//         const user = await User.findByIdAndUpdate(
//             req.user._id,
//             //unlike push, addToSet prevents duplicates
//             { $pull: { following: userIdToUnfollow } },
//             { new: true }
//         );
//     }
// }

// // TODO: Retweet function
// const retweet = async (req, res) => {
//     try {
//         const tweetIdToRetweet = req.params.tweetId;

//         // Check if tweet exists
//         const tweet = await Tweet.findById(tweetIdToRetweet);
//         if (!tweet) {
//             return res.status(404).send('Tweet not found');
//         }

//         // Add tweetIdToRetweet to authenticated user's retweets array
//         const user = await User.findByIdAndUpdate(
//             req.user._id,

//             // does not add duplicate like push
//             { $addToSet: { retweets: tweetIdToRetweet } },
//             { new: true }
//         );

//         // Increase retweets count for the original tweet
//         tweet.retweetsCount += 1;
//         await tweet.save();

//         // res.redirect(`/tweets/${tweetIdToRetweet}`);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server error');
//     }
// }


// // TODO Reply to tweet function
// const replyToTweet = async (req, res) => {
//     try {
//         const tweetId = req.params.tweetId;
//         const { replyText } = req.body;

//         // Find the tweet to reply to
//         const tweet = await Tweet.findById(tweetId);
//         if (!tweet) {
//             return res.status(404).send('Tweet not found');
//         }

//         // Create the reply tweet
//         const replyTweet = new Tweet({
//             tweetText: replyText,
//             username: req.user.username,
//             userId: req.user._id,
//             replyToTweet: tweet._id
//         });

//         // Save the reply tweet to the database
//         await replyTweet.save();

//         // Add the reply tweet to the original tweet's replies array
//         tweet.replies.push(replyTweet._id);
//         await tweet.save();

//         res.redirect('/home');
//     } catch {

//     }
// }

module.exports = {
    createTweet,
    tweetLikes,
    // followUser,
    // unfollowUser,
    // retweet,
    // replyToTweet,
}