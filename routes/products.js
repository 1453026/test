var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Cart = require('../models/cart');

/* GET users listing. */
router.get('/', function (req, res) {
    var session = req.session;
    Product.find(function (err, products) {
        if (err) return err;
        if (products) {
            res.render('collection', {title: 'Product', products: products, session: session});
        }
    });
});

router.get('/:id', function (req, res) {
    var session = req.session;
    Product.findOne({'_id': req.params.id}, function (err, product) {
        if (err) return err;
        if (product) {
            res.render('product', {title: 'Product', product: product, session: session});
        }
    });
});

router.get('/add-to-cart/:id', function (req, res) {
    var pid = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});
    // res.send(cart);
    Product.findOne({'_id': req.params.id}, function (err, product) {
        if (err) return err;
        if (product) {
            cart.add(product, pid);
            req.session.cart = cart;
            res.redirect('/products/' + pid);
        }
    });
});

router.get('/delete-from-cart/:id', function(req, res, next) {
    var pid = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    cart.delete(pid);
    req.session.cart = cart;
    res.redirect(req.get('referer'));
});

module.exports = router;