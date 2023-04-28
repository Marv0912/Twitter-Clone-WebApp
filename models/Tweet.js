const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tweet Schema
const tweetSchema = new Schema({
    tweetText: {
        type: String,
        required: true,
        maxLength: 280
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tweetId: { type: mongoose.ObjectId },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true })


module.exports = mongoose.model('Tweet', tweetSchema)