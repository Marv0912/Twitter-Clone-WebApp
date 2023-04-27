const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const retweetSchema = new Schema({
    tweetId: {
        type: Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Retweet', retweetSchema)
// TODO: Create separate controller file







