var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//create schema for User
var schema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    phone: { type: String }
});

//create a function called authenticate inputs against user database
schema.statics.authenticate = function(email, password, callback) {
    User.findOne({ email: email }).exec(function(error, user) {
        if (error) {
            return callback(error);
        } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function(error, result) {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        });
    });
}

//hash password
schema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

var User = mongoose.model('User', schema);
module.exports = User;