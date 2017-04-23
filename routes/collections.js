var express = require('express');
var router = express.Router();
var Collection = require('../models/product');

/* GET home page. */
router.get('/', function (req, res) {
    var session = req.session;
    Collection.aggregate([{$group:{_id:{"category" : "$category"}, imagePath: {$addToSet: "$imagePath.large"}}}], function (err, collections) {
        if (err) return err;
        if (collections) {
            res.render('shop', {title: 'Express', collections: collections, session: session });
            // res.send(collections)
        }
    });
});

router.get('/:id', function (req, res) {
    var session = req.session;
    Collection.find({'category': req.params.id}, function (err, products) {
        if (err) return err;
        if (products) {
            res.render('collection', {title: req.params.id, products: products, session: session});
        }
    })
});

module.exports = router;

/**
 * Created by TranMinhTam on 4/4/2017.
 */
