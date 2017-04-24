var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('signin', { title: 'Sign In' });
});

/* POST signin page */
router.post('/', function(req, res, next) {
    if (req.body.email && req.body.password) {
        if (req.body.email === 'admin@mail.com' && req.body.password === 'admin') {
            res.redirect('/admin');
        }
        //using the function that was created in the user.js file
        User.authenticate(req.body.email, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                //the function will retrieve the user document that are authenticated.
                //create a session with userID to contain the _id of the authenticated user.
                req.session.userID = user._id;
                res.redirect('/');
            }
        });
    } else {
        var err = new Error('Email and password are required.');
        err.status = 401; //401 means unauthorized or bad authentication
        return next(err);
    }
});

module.exports = router;

/**
 * Created by USER on 4/8/2017.
 */