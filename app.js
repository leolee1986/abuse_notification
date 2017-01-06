var express       = require("express"),
    mongoose      = require("mongoose"),
    Notification  = require("./models/notification"),
    seedDB        = require("./seed"),
    bodyParser    = require("body-parser"),
    app           = express();

app.set("view engine", "ejs");
// use body-parser to parse the form data
app.use(bodyParser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/abuse_notification");

//===============
// Route 
//===============
app.get("/", function(req, res) {
    res.redirect("/notifications");
})

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
   res.render("new"); 
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
    var newNotification = {notificationId: notificationId, notificationDate: notificationDate};
    
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









//==============================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});
