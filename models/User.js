const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(v);
            },
            message: props => `${props.value} is not a valid password!`
        }
    },
    followers: {
        type: [mongoose.ObjectId]
    },
    following: {
        type: [mongoose.ObjectId]
    },

}, { timestamps: true})

module.exports = mongoose.model('User', userSchema)