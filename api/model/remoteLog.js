var mongoose = require('mongoose');

var remoteLogSchema = mongoose.Schema({
    occuredOn: Date,
    name: String,
    remoteId: String,
    remoteCommand: String,
    remoteCounter: String
});

var RemoteLog = module.exports = mongoose.model('RemoteLog', remoteLogSchema);