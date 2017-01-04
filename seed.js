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
    ]


function seedDB(){
    //   Remove all database date to test 
        Notification.remove({},function(err){
        if(err){
           console.log(err); 
        }
        console.log("removed notifications!");
}

// export seedDB
