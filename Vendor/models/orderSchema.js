var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    address_line1: String,
    address_line2: String,
    city: String,
    pincode: String,
    state: String,
    country: String
});

const shippingSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    address : addressSchema
});

const billSchema = new mongoose.Schema({
    productid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default : 1
    },
    isArrived : {
        type : Boolean,
        required : true,
        default : false
    }
});

var orderSchema = new mongoose.Schema({
    userid: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    shippingAddress : {
        type: shippingSchema
    },
    bill : [
        billSchema
    ],
    totalCost : Number,
    status : {
        type : String,
        required : true,
        default : "Placed"
    },
    paymentMethod : {
        type: String,
        required: true
    },
    time : Date,
    isPaid : {
        type: Boolean,
        required: true,
        default : false
    },
    specialInstructions : {
        type: String
    }
});


module.exports = mongoose.model('Order', orderSchema);
