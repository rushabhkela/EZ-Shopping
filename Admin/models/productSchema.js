var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    vendor: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    reviews: {
        type: [
            {
                ofUser: mongoose.SchemaTypes.ObjectId,
                comment: String,
                createdAt: Date,
                rating: Number
            }
        ],
        required: true,
        default: []
    }
});


module.exports = mongoose.model('Product', productSchema);
