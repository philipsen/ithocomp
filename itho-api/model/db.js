
var mongoose = require('mongoose');
//const MONGODB_HOST = 'mongo';
//const MONGODB_PORT = '27017';

var waitForMongoose = require('./waitForMongoose');

var url = 'mongodb://' + process.env.MONGODB_HOST + ':' + process.env.MONGODB_PORT + '/mydb';
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