var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user: { type: String, required: true},
    detail: {
        items: { type: Object, required: true },
        count: { type: Number, required: true},
        totalPrice: { type: Number, required: true}
    }
});
module.exports = mongoose.model('Bill', schema);
/**
 * Created by USER on 4/13/2017.
 */
