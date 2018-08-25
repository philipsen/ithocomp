console.log('compile stoveStatusEvent');
var mongoose = require('mongoose');
var options = { discriminatorKey: 'kind' };
var Event = require('./event');

var stoveStatusEventSchema = new mongoose.Schema({
    level: Number
}, options);
var stoveStatusEvent = module.exports = Event.discriminator('StoveStatus', stoveStatusEventSchema);
