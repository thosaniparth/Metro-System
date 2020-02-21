var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true,trim: true },
    contact: { type: Number, required: true },
    password: { type: String, required: true,trim: true },
    walletBalance: { type: Number, required: true, default:0 },
    usedCouponCodes: { type: [String], required: true },
    admin: { type: Boolean, required: true }
});

var User = mongoose.model('User', user);
module.exports = User;