var mongoose = require("mongoose");

var notificationSchema = new mongoose.Schema({
    notificationId: String,
    notificationDate: Date
});

module.exports = mongoose.model("Notification", notificationSchema);