const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); 

// User Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    followers: {
        type: [mongoose.ObjectId]
    },
    following: {
        type: [mongoose.ObjectId]
    },

}, { timestamps: true })

userSchema.plugin(passportLocalMongoose);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = function (userPassword) {
    return bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model('User', userSchema)