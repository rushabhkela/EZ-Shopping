var mongoose = require('mongoose');
var crypto = require('crypto');

var addressSchema = new mongoose.Schema({
    name : String,
    address_line1: String,
    address_line2: String,
    city: String,
    pincode: String,
    state: String,
    country: String
});


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    contact : {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    primary_address: {
        type: [addressSchema],
        required : true,
        default : []
    },
    secondary_address: {
        type: [addressSchema],
        required : true,
        default : []
    },
    hash: String,
    salt: String
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);
