var mongoose = require('mongoose');

var houseSchema = mongoose.Schema({
    name: String,
    ip: String,
    parameters: [{ name: String, value: String }]
});

var House = module.exports = mongoose.model('House', houseSchema);
