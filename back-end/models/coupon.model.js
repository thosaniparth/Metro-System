var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var coupon = new Schema({
    code: { type: String, required: true, trim: true },
    percentageOff: { type: Number, maxlength: 2, required: true },
    timeAdded: { type: Date, required: true }
});

var Coupon = mongoose.model('Coupon', coupon);
module.exports = Coupon;