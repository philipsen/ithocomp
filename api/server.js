'use strict';

const mqtt    = require('mqtt')
const client  = mqtt.connect('mqtt://pubsub')
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/command/:id/:cmd', (req, res) => {
    res.send('OK');
    client.publish(req.params.id + '/command', req.params.cmd);
});
    
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


client.on('connect', function () {
  client.subscribe('presence')
  client.publish('presence', 'Hello mqtt')
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log("received message")
  console.log(message.toString())
})
