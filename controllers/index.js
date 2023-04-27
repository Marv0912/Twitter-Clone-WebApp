const express = require('express');
const router = express.Router();
const User = require('../models/User');

const handleRegistration = async (req, res) => {
    try {
        // destructuring
        const { username, password } = req.body;

        // Check if a user with the same username already exists in the database
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // If the user already exists, send an error message to the client
            return res.status(400).send('Username already taken');
        }

        // Create a new user object using the User model
        const newUser = new User({
            username,
            password
        });

        // Save the new user to the database
        await newUser.save();

        // Redirect the user to the home page after successful registration
        res.redirect('/home');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = {
    handleRegistration,
}