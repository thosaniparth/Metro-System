var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var payment = new Schema({
    username: { type: String, required: true },
    a: { type: String, required: true },
    b: { type: String, required: true },
    couponCodeApplied: { type: Boolean, required: true },
    couponCode: { type: String },
    orgPrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true }
});

var Payment = mongoose.model('Payment', payment);
module.exports = Payment;