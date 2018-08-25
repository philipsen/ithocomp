var mongoose = require('mongoose');
var options = { discriminatorKey: 'kind' };
var Event = require('./event');

var webappClickEventSchema = new mongoose.Schema(
    {
      room: { type: String, required: true },
      command: { type: String, required: true }
    },
    options);
var WebappClickEvent = module.exports = Event.discriminator('WebappClick', webappClickEventSchema);
