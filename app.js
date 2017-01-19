var express        = require("express"),
    mongoose       = require("mongoose"),
    User           = require("./models/user"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    app            = express();

// require all the routes files and use them    
var indexRoutes = require("./routes/index");
var notificationRoutes = require("./routes/notifications");
var channelRoutes = require("./routes/channels");

app.use(indexRoutes);
app.use(notificationRoutes);
app.use(channelRoutes);


app.set("view engine", "ejs");
// use body-parser to parse the form data
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/abuse_notification");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    //secret can be anything, the resave and saveUnitialized needed to be added, be sure to spell them correctly
    secret:"cici is the best",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// User.authenticate() is a method that come from passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this is a middleware that pass to all route (the res.locals), then run the next function
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});


//==============================
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started");
});
