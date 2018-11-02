var con = require('../database/db_config');
var bcrypt = require('bcryptjs');
var exports = module.exports = {};
var randomstring = require("randomstring");
var dateTime = require('node-datetime');
var common_function = require('../common/common_functions');
var crypto = require('crypto');
const jwt = require('jsonwebtoken');




//get all departments data

exports.getDepartmentsList = function(req,res,empty,data)
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
/*this function is used to check departments with client_id is exist or not in database.*/
exports.checkDepartmentsExistWithID = function(client_id)
{

    return new Promise(function(success,fail){
        con.query('SELECT COUNT(client_id) as total FROM  departments WHERE client_id =?',[client_id], function (error, results,item)
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





//Get departments data with Client_id

exports.get_departments_details_with_ID = function(req,res,empty)
{
    var client_id = req.params.client_id.trim();

    this.checkDepartmentsExistWithID(client_id).then(function(data) {
        if(!data){
            res.json({
                "status":"2",
                "message":"Invalid credentials"
            });
        }

        else{
            con.query('SELECT * FROM departments WHERE client_id = ? order by id desc',[client_id], function (error, results)
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