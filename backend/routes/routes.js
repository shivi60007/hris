var express = require("express");
var fn = require('../functions/functions');
var empty = require('is-empty');
var common_function = require('../common/common_functions');


var router = express.Router();
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});


/* setting up routes for admin login*/
router.post("/login",function(req,res){
    fn.login(req,res,empty);
});

/* setting up routes for save departments*/
router.post("/save_departments",function(req,res){
    fn.save_departments(req,res,empty);
});


/* setting up routes for getting departments*/
router.get("/get_all_departments",function(req,res){
    fn.get_all_departments(req,res,empty);
});



/* setting up routes for Get departments Detail with ID*/
router.get('/get_departments_details/:id',function(req,res)
{
    fn.get_departments_details_with_ID(req,res,empty);
});


/* setting up routes for Update departments Detail with ID*/
router.post('/update_departments/:id',function(req,res)
{
    fn.update_departments(req,res,empty);
});


/* setting up routes for Delete departments Detail with ID*/
router.post('/delete_departments/:id',function(req,res)
{
    fn.delete_departments(req,res,empty);
});


module.exports = router;