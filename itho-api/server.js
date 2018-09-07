'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const mqtt = require('mqtt')
const client = mqtt.connect({ host: '167.99.32.103', username: 'itho', password: 'aapnootmies'});
const express = require('express');


var WebappClick = require('./model/webappClickEvent');

// App
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/command/:house/:room/:cmd', (req, res) => {
  WebappClick.create({ 
    house: req.params.house, 
    room: req.params.room,
    command: req.params.cmd
  })
  res.send(JSON.stringify('OK'));
  client.publish(req.params.house + '/command/' + req.params.room, req.params.cmd);
});

app.get('/api/houses', (req, res) => {
  var House = mongoose.model('House');
  House.find(function (err, houses) {
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
  House.find({ name: name }, function (err, house) {
    if (err) return console.error(err);
    console.log('house = ', house);
    res.send(JSON.stringify(house[0]));
  });
  //res.send('OK');
});


app.get('/api/house/status/:name', (req, res) => {
  console.log('get state');
  var name = req.params.name;
  var Event = mongoose.model('Event');
  Event.find({ house: name}, null, { sort: { 'time': -1 }, limit: 200}, function(err, events) {
    if (err) return console.error(err);
    events.reverse();
    var state = {};
    state.ventilation = 'none';
    var fs = events.reduce((state, event) => {
      //console.log('e = ', event.time, event.kind);
      if (event.kind === 'StoveStatus') {
        if (event.level > 0) {
          state.ventilation = "cook";
        } else {
          state.ventilation = state.ventilationBaseState;
        }
      }
      if (event.kind === 'WebappClick') {
        if (event.room === 'k') {
          if (event.command === 'eco' || event.command === 'comfort') {
            state.ventilationBaseState = event.command;
            state.ventilation = event.command;
            state.endTimeCommand = event.time;
          }
          if (event.command == 'cook1') {
            state.endTimeCommand = new Date(event.time.valueOf() + 30 * 60 * 1000);
            state.ventilation = 'cook';
          }
          if (event.command == 'cook2') {
            state.endTimeCommand = new Date(event.time.valueOf() + 60 * 60 * 1000);
            state.ventilation = 'cook';
          }

        }
      }
      //console.log('cs = ', state)
      return state;
    }, state);
    if (fs.endTimeCommand < new Date()) {
      //console.log('last comm expired');  
      fs.ventilation = fs.ventilationBaseState;

    //} else {
    //  console.log('last comm still active');
    }
    console.log('final =', fs);
    res.send(JSON.stringify(fs));
  });
  });


app.get('/api/house/events/:name', (req, res) => {
  console.log('get events');
  var name = req.params.name;
  var Event = mongoose.model('Event');
  Event.find({ house: name}, null, { sort: { 'time': -1 }, limit: 10}, function(err, events) {
    if (err) return console.error(err);


    res.send(JSON.stringify(events));
  })
});

app.delete('/api/house/:name', (req, res) => {
  console.log('delete house', req.params);
  var name = req.params.name;
  console.log('name = ', name);
  var House = mongoose.model('House');
  House.remove({ name: name }, function (err) {
    if (err) return console.error(err);
    console.log('house removed: ', name);
  })
  res.send(JSON.stringify('OK'));
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// app.use(function (req, res) {
//   console.log("here 2");
//   res.send(404);
// });

client.on('connect', function () {
  console.log('mqtt connected');
  client.subscribe('itho/log/+');
  client.publish('presence', 'Helo mqtt');
});

var mongoose = require("mongoose");
var db = require('./model/db');

client.on('message', function (topic, message) {
  console.log("received message4:", topic.toString(), message.toString());
  var house = topic.toString().split('/')[2];
  var param = message.toString().split('/')[0];
  var value = message.toString().split('/')[1];
  console.log('house', house, param, value);
  var IthoLog = mongoose.model('IthoLog');
  IthoLog.create({ 
    occurredOn: new Date(), 
    houseName: house,
    message: message
  }, function(err, data) {
    if (err) return console.error(err);
  });

  if (param == 'ip') {
    var House = mongoose.model('House');
    House.update({ name: house }, { name: house, ip: value }, { upsert: true }, function (err, raw) {
      if (err) return console.error(err);
    });
  }
  if (param == 'stove') {
    var StoveStatus = mongoose.model('StoveStatus');
    StoveStatus.create({
      house: house,
      level: value
    });
  }
});



