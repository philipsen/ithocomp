'use strict';

const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://pubsub')
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/command/:house/:room/:cmd', (req, res) => {
  console.log('api send command', req.params.house, req.params.room, req.params.cmd);
  //console.log('received: ', req);
  res.send(JSON.stringify('OK'));
  client.publish(req.params.house + '/command/' + req.params.room, req.params.cmd);
});

app.get('/api/houses', (req, res) => {
  var House = mongoose.model('House');
  House.find(function(err, houses) {
    if (err) return console.error(err);
    res.send(JSON.stringify(houses));
  });
});

app.get('/api/house/:name', (req, res) => {
  //console.log('here', req);
  //res.send(OK);
  var name = req.params.name;
  console.log('api get house ', name);
  var House = mongoose.model('House');
  House.find({ name: name }, function(err, house) {
    if (err) return console.error(err);
    console.log('house = ', house);
    res.send(JSON.stringify(house[0]));
  });
  //res.send('OK');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// app.use(function (req, res) {
//   console.log("here 2");
//   res.send(404);
// });

client.on('connect', function () {
  client.subscribe('itho/log/+');
  client.publish('presence', 'Helo mqtt');
});

var mongoose = require("mongoose");
var db = require('./model/db');
console.log('here');

client.on('message', function (topic, message) {
    console.log("received message4:", topic.toString(), message.toString());
    var house = topic.toString().split('/')[2];
    var param = message.toString().split('/')[0];
    var value = message.toString().split('/')[1];
    console.log('house', house, param, value);

    var House = mongoose.model('House');
    House.update({ name: house }, {name: house, ip: value}, { upsert: true }, function (err, raw) {
      console.log('in update');
      if (err) return console.error(err);
      if (!!raw && raw.upserted) {
        console.log('Created instance', raw)
      } else {
        console.log('Found existing instance', raw)
      }
      console.log('n = ', raw.n);
    });

    console.log('done');
  });



