var mongoose = require("mongoose");

var notificationSchema = new mongoose.Schema({
    id: String,
    date: Date,
    ibcap_ch : []
});

module.exports = mongoose.model("Notification", notificationSchema);