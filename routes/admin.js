var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var User = require('../models/user');
var Bill = require('../models/bill');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin_index', { title: 'Admin' });
});

router.get('/user_management', function(req, res, next) {
    User.find({}, function(err, users) {
        res.render('admin_user_management', { users: users });
    });
});

router.get('/orders', function(req, res, next) {
    Bill.find({}, function(err, orders) {
        res.render('admin_orders', { orders: orders });
    });
});

router.get('/products', function(req, res) {
    res.render('admin_product', { title: 'Products Management' });
});

router.get('/products/add', function(req, res) {
    res.render('admin_add_product', { title: 'Add Products' });
});

router.get('/setting', function(req, res) {
    res.render('admin_setting', { title: 'Settings' });
});

router.get('/about', function(req, res, next) {
    res.render('admin_about', { title: 'About' });
});

module.exports = router;

/**
 * Created by USER on 4/8/2017.
 */