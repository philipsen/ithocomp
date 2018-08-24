
var mongoose = require('mongoose');

var waitForMongoose = require('./waitForMongoose');

//var url = 'mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/mydb';
var url = process.env.MONGO_CONNECT;

console.log('db url: ', url);

waitForMongoose(url, {timeout: 60000}, function(err) {
    if(err) {
      console.log('here2');
      throw err;
    } else {
      console.log('Mongoose connected');
    }
  });

  require('./house');