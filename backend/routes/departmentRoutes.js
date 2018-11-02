var express = require("express");
var fn = require('../functions/departmentFunctions');
var empty = require('is-empty');
var common_function = require('../common/common_functions');


var router = express.Router();
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});






/* setting up routes for getting employees*/
router.get("/getDepartmentsList",function(req,res){
    fn.getDepartmentsList(req,res,empty);
});

/* setting up routes for Get employees Detail with ID*/
router.get('/get_departments_details/:client_id',function(req,res)
{
    fn.get_departments_details_with_ID(req,res,empty);
});

module.exports = router;