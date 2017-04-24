var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: { type: String, required: true },
    imagePath: {
        large: String,
        small: String
    },
    price: { type: String, required: true },
    category: { type: String, required: true },
    description: {
        slogan: String,
        shortDescription: String,
        benefits: [String],
        details: [String],
        origin: String,
        tags: [String]
    }
});
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', schema);

/**
 * Created by TranMinhTam on 4/3/2017.
 */
