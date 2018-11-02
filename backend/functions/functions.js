var con = require('../database/db_config');
var bcrypt = require('bcryptjs');
var exports = module.exports = {};
var randomstring = require("randomstring");
var dateTime = require('node-datetime');
var common_function = require('../common/common_functions');
var crypto = require('crypto');
const jwt = require('jsonwebtoken');


var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var emp_type = bodyParser.json();
app.use(emp_type);



// admin Login //
exports.login = function(req,res,empty)
{
    var email= req.body.email;

    var password = req.body.password.trim();

    var emp_type= req.body.emp_type.trim();



    switch(emp_type){
        case '2':

            con.query('SELECT * FROM clients WHERE email=?',[email], function (error, results)
            {
                if (error) {
                    res.json({
                        "status":"3",
                        "failed":"Oops some error has occurred."
                    })
                }else{
                    if(!empty(results )){
        
                        row = bcrypt.compare(password, results[0].password, function(err, rs) {
                            if(rs){
                                let payload = {userID:results[0].id};
                                let token = common_function.createToken(payload);
                                let user_id = results[0].id;
                                let user_name=results[0].name;
                                let user_email=results[0].email;
                            
        
        
                                res.json({
                                    "status":"1",
                                    "message":"Login successful",
                                    "data" : {
                                        "token":token,
                                        "user_id" : user_id,
                                        "user_name" : user_name,
                                        "user_email" : user_email,
                                       
                                        "user_access_level" : "2",
                                        "user_position" : "NA",
                                        "user_logged_in" : "TRUE",
                                    },
                                });
                            }else{
        
                                res.json({
                                    "status":"2",
                                    "message":"User Name and Password does not match"
                                });
                            }
                        });
                    }else{
                        res.json({
                            "status":"3",
                            "message":"Invalid credentials"
                        });
                    }
        
        
                }
        
       
        });
    break;
        case '3':

        
        con.query('SELECT * FROM employees WHERE email=?',[email], function (error, results)
        {
            if (error) {
                res.json({
                    "status":"3",
                    "failed":"Oops some error has occurred."
                })
            }else{
                if(!empty(results )){
    
                    row = bcrypt.compare(password, results[0].password, function(err, rs) {
                        if(rs){
                            let payload = {userID:results[0].id};
                            let token = common_function.createToken(payload);
                            let user_id = results[0].id;
                            let user_name=results[0].name;
                            let user_email=results[0].email;
    
    
    
                            res.json({
                                "status":"1",
                                "message":"Login successful",
                                "data" : {
                                    "token":token,
                                    "user_id" : user_id,
                                    "user_name" : user_name,
                                    "user_email" : user_email,
                                   
                                    "user_access_level" : "3",
                                    "user_position" : "NA",
                                    "user_logged_in" : "TRUE",
                                },
                            });
                        }else{
    
                            res.json({
                                "status":"2",
                                "message":"User Name and Password does not match"
                            });
                        }
                    });
                }else{
                    res.json({
                        "status":"3",
                        "message":"Invalid credentials"
                    });
                }
    
    
            }
        });
    break;


    }



}


/*this function is used to check departments is exist or not in database.*/
exports.checkDepartmentsExistWithID = function(id)
{

    return new Promise(function(success,fail){
        con.query('SELECT COUNT(id) as total FROM  departments WHERE id =?',[id], function (error, results,item)
        {
            if (error) {
                fail({
                    "status":"3",
                    "failed":"Oops some error has occurred."
                });
            } else {
                success(results[0].total);
            }
        });
    });

}


//Add Departments Details
exports.save_departments = function(req,res,empty,data)
{

    data = {
        "id" : obj.company_id.trim(),
        "name" : obj.accessory_name.trim(),

    };

    con.query('INSERT INTO  departments SET ?', data, function (error, results)
    {
        if (error) {
            res.json({
                "status":"2",
                "message":"Oops some error has occurred.",
                "data":error
            })
        }else{
            res.json({
                "status":"1",
                "message":"Insert Successfully",

            })
        }
    })
}


//get all Departments's data

exports.get_all_departments = function(req,res,empty,data)
{
    con.query('select * from departments', data, function (error, results)
    {
        if (error) {
            res.json({
                "status":"2",
                "failed":"Oops some error has occurred."
            })
        }

        else{
            res.json({
                "status":"1",
                "message":"Successful",
                "data":results
            });
        }
    })

}


//Get Departments's data with ID

exports.get_departments_details_with_ID = function(req,res,empty)
{
    var id = req.params.id.trim();

    this.checkDepartmentsExistWithID(id).then(function(data) {
        if(!data){
            res.json({
                "status":"2",
                "message":"Invalid credentials"
            });
        }

        else{
            con.query('SELECT * FROM departments WHERE id = ?',[id], function (error, results)
            {
                if (error) {

                    res.json({
                        "status":"3",
                        "failed":"Oops some error has occurred."
                    })
                }

                else{
                    res.json({
                        "status":"1",
                        "message":"Successful",
                        "data":results
                    });
                }
            });
        }
    })
}

//Update Departments Data With ID


exports.update_departments = function(req,res,empty)
{
    var id = req.params.id.trim();

    this.checkDepartmentsExistWithID(id).then(function(data) {
        if (!data) {
            res.json({
                "status": "2",
                "message": "Invalid credentials"
            });
        }
        else {

            dt = dateTime.create();
            formatted = dt.format('Y-m-d H:M:S');
            obj = req.body;
            update_data = {
                "company_name" : obj.company_name.trim(),
                "accessory_name" : obj.accessory_name.trim(),
                "category_name" : obj.category_name.trim(),
                "supplier_name" : obj.supplier_name.trim(),
                "location" : obj.location.trim(),
                "model_number" : obj.model_number.trim(),
                "order_number" : obj.order_number.trim(),
                "purchase_date" : obj.purchase_date.trim(),
                "purchase_cost" : obj.purchase_cost.trim(),
                "quantity" : obj.quantity.trim(),
                "manufacturer_name" : obj.manufacturer_name.trim(),
                "updated_at": formatted,
            };


            con.query('UPDATE employees SET ? WHERE id = ?', [update_data, id], function (error, results) {
                if (error) {

                    res.json({
                        "status": "3",
                        "failed": "Oops some error has occurred."
                    })
                }

                res.json({
                    "status": "1",
                    "message": "Updates Successful",
                    "data":update_data

                });

            })
        }
    })
}

//Delete departments Data With ID
exports.delete_departments = function(req,res,empty)
{
    var id = req.params.id;

    this.checkemployeesExistWithID(id).then(function(data) {
        if(!data){
            res.json({
                "status":"2",
                "message":"Invalid credentials"
            });
        }

        else{
            con.query('DELETE  FROM departments WHERE id = ?',[id], function (error, results)
            {
                if (error) {

                    res.json({
                        "status":"3",
                        "failed":"Oops some error has occurred."
                    })
                }

                else{
                    res.json({
                        "status":"1",
                        "message":"Deletion Successful",

                    });

                }
            });
        }
    })
}











