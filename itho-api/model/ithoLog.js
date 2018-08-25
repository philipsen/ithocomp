var mongoose = require('mongoose');
console.log('load model/ithoLog');

var ithoLogSchema = mongoose.Schema({
    occurredOn: Date,
    houseName: String,
    message: String
});

var IthoLog = module.exports = mongoose.model('IthoLog', ithoLogSchema);
