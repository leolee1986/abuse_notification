var express = require("express");
var router = express.Router();
var Notification = require("../models/notification");
var Channel = require("../models/channel");

//===============
// Notificaiton Route 
//===============
router.get("/", function(req, res) {
    res.redirect("/notifications");
});

// INDEX Route
router.get("/notifications", function(req, res){
    // find all the notification and pass the data back to index.ejs to render the index page
    Notification.find({},function(err, allNotifications){
        if(err){
            console.log(err);
        }else{
            res.render("index",{notifications:allNotifications});
        }
    });
});


// NEW Route
router.get("/notifications/new",isLoggedIn, function(req, res){
    Channel.find({}, function(err, allChannels) {
        if(err){
            console.log(err);
        }else{
            res.render("new", {channels:allChannels});
        }
    });
    
});


// SHOW Route
router.get("/notifications/:id", function(req, res){
    Notification.findById(req.params.id,function(err, foundNotification){
        if(err){
            console.log(err);
        }else{
            res.render("show",{notification: foundNotification})
        }
    });
});

// CREATE Route
router.post("/notifications",isLoggedIn, function(req, res){
    // get data from form and add to notifications array
    var notificationId = req.body.notificationId;
    var notificationDate = req.body.notificationDate;
    var notificationRecipient = req.body.notificationRecipient;
    var newNotification = {
        notificationId: notificationId, 
        notificationDate: notificationDate, 
        notificationRecipient:notificationRecipient
    };
    
    // Create a new notification and save to DB
    Notification.create(newNotification, function(err){
        if(err){
            console.log(err);
        }else{
            //redirect back to notifications page
            res.redirect("/notifications");
        }
    });
});

// EDIT Route
router.get("/notifications/:id/edit", function(req, res) {
    Notification.findById(req.params.id,function(err,foundNotification){
        if(err){
            console.log(err);
        }else{
            res.render("edit",{notification: foundNotification});
        }
    });

});

// UPDATE Route
router.put("/notifications/:id", function(req, res){
    // findByIdAndUpdate take 3 args, id, newData, callback
    Notification.findByIdAndUpdate(req.params.id, req.body.notification, function(err, updatedNotification){
        if(err){
            res.redirect("/notifications");
        }else{
            res.redirect("/notifications/" +req.params.id);
        }
    })
});

// DELETE Route
router.delete("/notifications/:id", function(req, res){
    // delete a notification, take 2 args, id callback
    Notification.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/notifications");
        }
    });
});

// middleware to check if user is logged in
function isLoggedIn (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
