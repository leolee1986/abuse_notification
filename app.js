var express        = require("express"),
    mongoose       = require("mongoose"),
    Notification   = require("./models/notification"),
    Channel        = require("./models/channel"),
    seedDB         = require("./seed"),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    app            = express();

app.set("view engine", "ejs");
// use body-parser to parse the form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/abuse_notification");

//===============
// Notificaiton Route 
//===============
app.get("/", function(req, res) {
    res.redirect("/notifications");
});

// INDEX Route
app.get("/notifications", function(req, res){
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
app.get("/notifications/new", function(req, res){
    Channel.find({}, function(err, allChannels) {
        if(err){
            console.log(err);
        }else{
            res.render("new", {channels:allChannels});
        }
    });
    
});


// SHOW Route
app.get("/notifications/:id", function(req, res){
    Notification.findById(req.params.id,function(err, foundNotification){
        if(err){
            console.log(err);
        }else{
            res.render("show",{notification: foundNotification})
        }
    });
});

// CREATE Route
app.post("/notifications", function(req, res){
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
app.get("/notifications/:id/edit", function(req, res) {
    Notification.findById(req.params.id,function(err,foundNotification){
        if(err){
            console.log(err);
        }else{
            res.render("edit",{notification: foundNotification});
        }
    });

});

// UPDATE Route
app.put("/notifications/:id", function(req, res){
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
app.delete("/notifications/:id", function(req, res){
    // delete a notification, take 2 args, id callback
    Notification.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/notifications");
        }
    });
});

//========================================
// Channels Routes
//========================================

// Channels INDEX route
app.get("/channels", function(req, res) {
        Channel.find({},function(err, allChannels){
        if(err){
            console.log(err);
        }else{
            res.render("./channels/channels",{channels:allChannels});
        }
    });

})

// Channels NEW Route
app.get("/channels/new", function(req, res){
    res.render("./channels/new");
});

// Channels CREATE Route
app.post('/channels', function(req, res){
    // get data from form
    var channelName = req.body.channelName;
    var programmer = req.body.programmer;
    var logo = req.body.logo;
    var poa = req.body.poa;
    var language = req.body.language;
    var newChannel = {
        channelName:channelName,
        programmer:programmer,
        logo:logo,
        poa:poa,
        language:language
    };
    //create a new channel and save to DB
    Channel.create(newChannel, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/channels");
        }
    });
});

// Channels SHOW Route
app.get("/channels/:id",function(req, res) {
    Channel.findById(req.params.id, function(err, foundChannel) {
        if(err){
            console.log(err);
        }else{
            res.render("./channels/show", {channel:foundChannel}); 
        }
    })
});


// Channels Edit Route
app.get("/channels/:id/edit", function(req, res) {
    Channel.findById(req.params.id, function(err, foundChannel) {
        if(err){
            console.log(err);
        }else{
            res.render("./channels/edit", {channel:foundChannel});
        }
    })
});

// Channels UPDATE Route
app.put("/channels/:id", function(req, res){
    Channel.findByIdAndUpdate(req.params.id, req.body.channel, function(err, updatedChannel){
        if(err){
            console.log(err);
        }else{
            res.redirect("/channels/"+req.params.id);
        }
    });
});

// Channels Delete Route
app.delete("/channels/:id", function(req, res){
    // delete a notification, take 2 args, id callback
    Channel.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/channels");
        }
    });
});


//==============================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});
