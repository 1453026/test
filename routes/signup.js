var express = require('express');
var User = require('../models/user');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Sign up' });
});

/* POST signup page */
router.post('/', function(req, res) {
    var userdata = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password
    };
    //insert data into database
    User.create(userdata, function(error, user) {
        if (error) {
            res.send(error);
        }
        if (user) {
            req.session.userID = user._id;
            res.redirect('/profile');
        }
    });
});

router.post('/validation', function(req, res) {
    User.findOne({'email': req.body.email}, function (err, user) {
        if (user) {
            res.send(user)
        }
        else {
            res.send({})
        }
    })
});

module.exports = router;

/**
 * Created by USER on 4/8/2017.
 */