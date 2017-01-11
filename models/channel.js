var mongoose = require("mongoose");

var channelSchema = new mongoose.Schema({
    channelName: String,
    programmer: String,
    poa: Boolean,
    logo: String,
    language: String
    
});

module.exports = mongoose.model("Channel", channelSchema);