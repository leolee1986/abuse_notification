var express = require("express");

var app = express();

app.set("view engine", "ejs");

//===============
// Route 
//===============

// INDEX Route
app.get("/", function(req, res){
    res.render("index");
});


// NEW Route
app.get("/new", function(req, res){
   res.render("new"); 
});


// SHOW Route










//==============================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});
