var express = require('express');
var router = express.Router();
var Product = require('../models/product');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin_index', { title: 'Admin' });
});

router.get('/user_management', function(req, res, next) {
    res.render('admin_user_management', { title: 'User Management' });
});

router.get('/orders', function(req, res, next) {
    res.render('admin_orders', { title: 'Orders' });
});

router.get('/products', function(req, res) {
    res.render('admin_product', { title: 'Products Management' });
});

router.get('/products/add', function(req, res) {
    res.render('admin_add_product', { title: 'Add Products' });
});

module.exports = router;

/**
 * Created by USER on 4/8/2017.
 */