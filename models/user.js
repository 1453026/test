var mongoose = require('mongoose');

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
        if (password === user.password) {
            return callback(null, user);
        } else {
            return callback();
        }
    });
}

var User = mongoose.model('User', schema);
module.exports = User;