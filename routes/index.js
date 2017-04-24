var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
var Product = require('../models/product');
var Bill = require('../models/bill');
var Cart = require('../models/cart');
var Subscription = require('../models/subscription');
var paypal = require('paypal-rest-sdk');
var User = require('../models/user');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tracershop@gmail.com',
        pass: 'tracershop2612'
    }
});

// setup email data with unicode symbols
var mailOptions = {
    from: '"T-RACER SHOP" <tracershop@gmail.com>', // sender address
    subject: 'Subscription Complete' // Subject line
};

/* GET home page. */
router.get('/', function(req, res) {
    var session = req.session;
    res.render('index', { title: 'T.RACER', session: session });
});

router.get('/contact', function(req, res) {
    var session = req.session;
    res.render('contact', { title: 'T.RACER', session: session });
});

router.get('/checkout', function(req, res) {
    var session = req.session;
    res.render('checkout', { title: 'T.RACER', session: session });
});

router.get('/checkout/proceed', function(req, res) {
    var session = req.session;
    if (session.cart) {
        var bill = {
            user: req.session.userID,
            detail: session.cart
        };
        Bill.create(bill, function(error, bill) {
            if (error) {
                res.send(error);
            }
            if (bill) {
                var payment = {
                    "intent": "sale",
                    "payer": {
                        "payment_method": "paypal"
                    },
                    "redirect_urls": {
                        "return_url": "/execute",
                        "cancel_url": "/"
                    },
                    "transactions": [{
                        "amount": {
                            "total": bill.detail.totalPrice,
                            "currency": "USD"
                        },
                        "description": 'Payment'
                    }]
                };
                //payment
                paypal.payment.create(payment, function(error, payment) {
                    if (error) {
                        console.log(error);
                    } else {
                        if (payment.payer.payment_method === 'paypal') {
                            req.session.paymentId = payment.id;
                            var redirectUrl;
                            for (var i = 0; i < payment.links.length; i++) {
                                var link = payment.links[i];
                                if (link.method === 'REDIRECT') {
                                    redirectUrl = link.href;
                                }
                            }
                            res.redirect(redirectUrl);
                        }
                    }
                });
                req.session.cart = new Cart({ items: {} });
            }
        });
    }
});

var searchPhrase = '';

router.post('/search', function(req, res) {
    searchPhrase = req.body.value;
    res.redirect('search/?page=0');
});

router.get('/search', function(req, res) {
    var session = req.session;
    Product.paginate({ 'name': { "$regex": searchPhrase, "$options": "i" } }, {
        offset: parseInt(req.query.page) * 10,
        limit: 10
    }, function(err, result) {
        if (result) {
            res.render('search-result', {
                title: 'Search Result',
                products: result.docs,
                pages: result.total / 10,
                session: session
            });
        }
    });
});

router.post('/subscribe', function(req, res) {
    mailOptions.to = req.body.subscribeEmail;
    Subscription.findOne({ 'email': req.body.subscribeEmail }, function(err, email) {
        if (err) res.send(err);
        if (email) {
            mailOptions.text = 'Dear,\n\nWe recognised this email has already been subscribed.\n\nThank you again for subscribing\n\nWe will make sure this email will receive our latest letters\n\nT-RACER';
            transporter.sendMail(mailOptions, function(error) {
                if (error) {
                    return console.log(error);
                }
            });
        } else {
            var subscription = {
                email: req.body.subscribeEmail
            };
            //insert data into database
            Subscription.create(subscription, function(error, email) {
                if (error) {
                    res.send(error);
                }
            });
            mailOptions.text = 'Thank you for subscribing to our shop\'s newsletter\n\nWe will keep you up to date with products and sales information.\n\nIf you need anything, feel free to contact us via this email address\n\nT.RACER';
            transporter.sendMail(mailOptions, function(error) {
                if (error) {
                    return console.log(error);
                }
            });
        }
    });
});

module.exports = router;