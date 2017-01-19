var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//==============================
// AUTH Route
//==============================
router.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username
    });
    //User.register() provided by passport-local-mongoose
    // register() take 3 args, user, password and callback function
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
            return res.render("/register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/notifications");
        });
    });
});

// login route
router.get("/login", function(req, res) {
    res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/notifications",
    failureRedirect: "/login"
}), function(req, res) {
    
});

// logout logic
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/notifications");
});



module.exports = router;