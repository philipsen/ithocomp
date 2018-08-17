
var mongoose = require('mongoose');

var waitForMongoose = require('./waitForMongoose');

var url = 'mongodb://mongo/mydb';

waitForMongoose(url, {timeout: 60000}, function(err) {
    if(err) {
      throw err;
    } else {
      console.log('Mongoose connected');
      //process.exit(0);
    }
  });

  // setTimeout(function() {
  //   mongoose.connect(url);
  // }, 1000);

// mongoose.connect(url);
//   var db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error:'));
//   db.once('open', function () {
//     console.log('connected');
//     // message is Buffer
//     console.log("received message4:", topic.toString(), message.toString());
//     var house = topic.toString().split('/')[2];
//     var param = message.toString().split('/')[0];
//     var value = message.toString().split('/')[1];
//     console.log('house', house, param, value);

//     House.update({ name: house }, {name: house, ip: value}, { upsert: true }, function (err, raw) {
//       if (err) return console.error(err);
//       if (!!raw && raw.upserted) {
//         console.log('Created instance', raw)
//       } else {
//         console.log('Found existing instance', raw)
//       }
//       console.log('n = ', raw.n);
//       mongoose.disconnect();
//     });
      
//   });

  require('./house');