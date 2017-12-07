var mongo = require("mongoose");

var db = mongo.connect("mongodb://127.0.0.1:27017/contactList",
    function (error, response) {
        if (error) {
            console.log("Failed to connect to " + db);
        } else {
            console.log("Connect to " + db, " + ", response);
        }
    });

module.exports = db;