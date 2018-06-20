'use strict';

const mqtt    = require('mqtt')
const client  = mqtt.connect('mqtt://pubsub')
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
        res.send('Hello world\n');
    });

app.get('/aap', (req, res) => {
    res.send('Hello world aap2\n');
    client.publish('wmt6/command/eco');
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
  //client.end()
})
