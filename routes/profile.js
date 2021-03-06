var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');

/* GET homepage */
router.get('/', function(req, res, next) {
    var session = req.session;
    if (!session.userID) {
        var err = new Error('You are not authorized to view this page.');
        err.status = 403; //403 means forbidden.
        res.redirect('/signin');
    } else {
        User.findById(req.session.userID).exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                res.render('profile', { title: 'Profile', user: user, session: session });
            }
        });
    }
});

router.get('/signout', function(req, res, next) {
    if (req.session) {
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                res.redirect('/');
            }
        })
    }
});

router.post('/', function(req, res, next) {
    var newfullname = req.body.fullname;
    var newphone = req.body.phone;
    var curpassword = req.body.curpwd;
    var newpassword = req.body.newpwd;
    User.findByIdAndUpdate(req.session.userID, { fullname: newfullname, phone: newphone }, { 'new': true }, function(err, user) {
        if (err) {
            console.log(err);
            return err;
        } else {
            if (curpassword) {
                bcrypt.compare(curpassword, user.password, function(error, result) {
                    if (result === true) {
                        User.findById(req.session.userID, function(err, user) {
                            user.password = newpassword;
                            console.log(user.password);
                            user.save();
                        });
                    }
                });
            } else {
                res.redirect('/profile');
            }
        }
    });
});

module.exports = router;