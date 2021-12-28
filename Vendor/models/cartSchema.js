var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    productid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default : 1
    }
});


module.exports = mongoose.model('Cart', cartSchema);
