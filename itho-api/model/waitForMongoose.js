'use strict';
var mongoose = require('mongoose');
function waitForMongoose(uri, options, callback) {
  var startTime = Date.now();
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  options.timeout = options.timeout || 1000 * 60 * 2; // 2 minutes
  options.interval = options.interval || 1000 * 5; // 5 seconds
  mongooseConnectionHandler();
  function mongooseConnectionHandler() {
    var currentTime = Date.now();
    if (currentTime - startTime < options.timeout) {
      mongoose.connect(uri, function (err, db) {
        if (err) {
          console.log('Mongoose: unable to connect, retry in ', options.interval);
          //console.log('Unable to connect to the server. Please start the server. Error:', err);
          setTimeout(mongooseConnectionHandler, options.interval);
        } else {
          console.log('Connected to MONGO Server successfully!');
        }
      });;
      mongoose.connection.on('error', (err) => {
        if (err && err.message === 'connect ECONN REFUSED') {
          setTimeout(mongooseConnectionHandler, options.interval);

        }
      });
      mongoose.connection.once('open', () => {
        //mongoose.connection.close(callback);
      });
    } else {
      callback(new Error('Could not connect to MongoDB'));
    }
  }
}
module.exports = waitForMongoose;
