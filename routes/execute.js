var express = require('express');
var paypal = require('paypal-rest-sdk');
var User = require('../models/user');
var nodemailer = require('nodemailer');
var router = express.Router();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tracershop@gmail.com',
        pass: 'tracershop2612'
    }
});

var mailOrdersOptions = {
    from: '"T-RACER SHOP" <tracershop@gmail.com>', // sender address
    subject: 'Order complete' // Subject line
};

router.get('/:paymentId', function(req, res) {
    var paymentId = req.session.paymentId;
    var payerId = req.param('PayerID');

    var details = { "payer_id": payerId };
    paypal.payment.execute(paymentId, details, function(error, payment) {
        if (error) {
            console.log(error);
        } else {
            User.findById(req.session.userID, function(err, user) {
                mailOrdersOptions.to = user.email;
                mailOrdersOptions.text = 'Your order is completely paid.\n Payment ID:' + paymentId + '\nThank you for your your trust.\nT-RACER';
                transporter.sendMail(mailOrdersOptions, function(error) {
                    if (error) {
                        return console.log(error);
                    } else {
                        res.redirect('/');
                    }
                });
            });
        }
    });
});

module.exports = router;