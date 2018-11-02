var mysql = require('mysql');
var exports = module.exports = {};
/* connection with database */
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hrms"
});

con.connect(function(err) {
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error while connecting with database");
    }
});

module.exports = con;

