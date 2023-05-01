const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

module.exports = {
    handleRegistration: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
    
        // Check if a user with the same username already exists in the database
        const existingUser = await User.findOne({ username });
    
        if (existingUser) {
            // If the user already exists, send an error message to the client
            return res.status(400).send('Username already taken');
        }
    
        // Use the 'register' method provided by passport-local-mongoose to create a new user
        User.register(new User({ username, password }), password, (err, user) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error registering user');
            }
    
            req.login(user, err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error logging in after registration');
                }
                res.redirect('/home');
            });
        });
    },
    login: (req, res, next) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error('Error:', err);
                return next(err);
            }
    
            if (!user) {
                console.error('User not found:', user);
                console.error('Info:', info);
                return res.redirect('/login');
            }
    
            req.logIn(user, (err) => {
                if (err) {
                    console.error('Login error:', err);
                    return next(err);
                }
    
                return res.redirect('/home');
            });
        })(req, res, next);
    },

    logout: (req, res) => {
        req.logout();
        res.redirect('/login');
    }
    // Redirect the user to the home page after successful registration
    //res.redirect(`home/index/?user=${username}`);//, {tweets}
};

