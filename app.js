var express       = require("express"),
    mongoose      = require("mongoose"),
    Notification  = require("./models/notification"),
    seedDB        = require("./seed"),
    app           = express();

app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/abuse_notification");

//===============
// Route 
//===============
app.get("/", function(req, res) {
    res.redirect("/notifications");
})

// INDEX Route
app.get("/notifications", function(req, res){
    res.render("index");
});


// NEW Route
app.get("/notifications/new", function(req, res){
   res.render("new"); 
});


// SHOW Route
app.get("/notifications/:id", function(req, res){
    res.render("show");
});










//==============================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});
