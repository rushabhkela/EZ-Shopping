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
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity : {
        type: Number,
        required: true
    },
    vendor : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    rating : {
        type : Number,
        default : 0,
        required : true,
    },
    reviews : [
        {
            ofUser : mongoose.SchemaTypes.ObjectId,
            userName : String,
            comment : String,
            createdAt : Date,
            rating : Number
        }
    ]
});


module.exports = mongoose.model('Product', productSchema);
