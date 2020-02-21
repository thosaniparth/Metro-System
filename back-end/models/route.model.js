var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var route = new Schema({
    a: { type: String, required: true },
    b: { type: String, required: true },
    price: { type: Number, required: true }
});

var Route = mongoose.model('Route', route);
module.exports = Route;