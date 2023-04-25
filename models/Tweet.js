const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tweet Schema
const tweetSchema = new Schema({
    tweetText: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
            return v.length >= 1 && v.length <= 280;
            },
            message: props => `Tweet text must be between 1 and 280 characters!`
        }
    },
    tweetId: {type: mongoose.ObjectId},

    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    likes: {
        type: [ObjectId]
    }
}, {timestamps: true})

module.exports = mongoose.model('Tweet', tweetSchema)