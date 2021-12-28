var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    address_line1: String,
    address_line2: String,
    city: String,
    pincode: Number,
    state: String,
    country: String
});

var vendorSchema = new mongoose.Schema({
    isVerified: {
        type: Boolean,
        required: true,
        default : false
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema
    },
    email: {
        type: String,
        required: true
    },
    contact : {
        type: Number,
        required: true
    },
    identity_document : {
        type: String,
        required: true
    },
    hash: String,
    salt: String
});

vendorSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

vendorSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};


module.exports = mongoose.model('Vendor', vendorSchema);
