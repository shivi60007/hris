var express = require("express");
var port = 8081;
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

var emp_type = bodyParser.json();
app.use(emp_type);



// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    // Pass to next layer of middleware
    next();
});




app.use(express.json());



var Admin = require('./routes/routes');
app.use('/api/admin',Admin);

var Employees=require('./routes/employeeRoutes');
app.use('/api/employees',Employees);

var Departments=require('./routes/departmentRoutes');
app.use('/api/departments',Departments);

/*listen to the port*/
app.listen(port,function(){
    console.log("server is now running on port....."+port);
});
