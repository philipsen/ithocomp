var mongoose = require('mongoose');
var options = { discriminatorKey: 'kind' };
var eventSchema = new mongoose.Schema(
  {
    time: {
      type: Date,
      default: Date.now
    },
    house: String
  },
  options);
var Event = module.exports = mongoose.model('Event', eventSchema);

