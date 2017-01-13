var mongoose = require("mongoose");

var notificationSchema = new mongoose.Schema({
    notificationId: String,
    notificationDate: Date,
    notificationRecipient: String,
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Channel"
    }]
    //notificationSent: Boolean
});

module.exports = mongoose.model("Notification", notificationSchema);