var mongoose        = require("mongoose"),
    Notification    = require("./models/notification");
    
var data = [
        {
            id: "test001",
            date: "@{currentdate}"
        },
        {
            id: "test002",
            date: "@{currentdate}"           
        },
        {
            id: "test003",
            date: "@{currentdate}"
        }
    ];



