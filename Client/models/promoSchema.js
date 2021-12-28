var mongoose = require('mongoose');

var promoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: Date,
    expiresAt: Date,
    discount: Number
});


module.exports = mongoose.model('Promo', promoSchema);
