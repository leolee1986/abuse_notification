var express = require("express");
var router = express.Router();
var Channel = require("../models/channel");

//========================================
// Channels Routes
//========================================

// Channels INDEX route
router.get("/channels", function(req, res) {
        Channel.find({},function(err, allChannels){
        if(err){
            console.log(err);
        }else{
            res.render("./channels/channels",{channels:allChannels});
        }
    });

})

// Channels NEW Route
router.get("/channels/new", isLoggedIn,function(req, res){
    res.render("./channels/new");
});

// Channels CREATE Route
router.post('/channels',isLoggedIn, function(req, res){
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
router.get("/channels/:id",function(req, res) {
    Channel.findById(req.params.id, function(err, foundChannel) {
        if(err){
            console.log(err);
        }else{
            res.render("./channels/show", {channel:foundChannel}); 
        }
    })
});


// Channels Edit Route
router.get("/channels/:id/edit", function(req, res) {
    Channel.findById(req.params.id, function(err, foundChannel) {
        if(err){
            console.log(err);
        }else{
            res.render("./channels/edit", {channel:foundChannel});
        }
    })
});

// Channels UPDATE Route
router.put("/channels/:id", function(req, res){
    Channel.findByIdAndUpdate(req.params.id, req.body.channel, function(err, updatedChannel){
        if(err){
            console.log(err);
        }else{
            res.redirect("/channels/"+req.params.id);
        }
    });
});

// Channels Delete Route
router.delete("/channels/:id", function(req, res){
    // delete a notification, take 2 args, id callback
    Channel.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/channels");
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