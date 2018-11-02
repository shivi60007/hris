var exports = module.exports = {};
var config = require('./custom_config');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var con = require('../database/db_config');
var bcrypt = require('bcryptjs');
exports.randomID = function(length,ALPHABET) {
    var rtn = '';
    ALPHABET = ALPHABET.replace(/\s/g,'');
    for (var i = 0; i < length; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
}
exports.verifyVendorToken = function(req,res,next){
    if(!req.headers.authorization){
        return  res.status(401).send("Unauthorized request");
    }
    let token = req.headers.authorization.split(" ")[1];
    if(token === "null"){
        return  res.status(401).send("Unauthorized request");
    }
    jwt.verify(token, config.jwtTokenSecret, function(err, decoded) {
        if (err){
            return res.status(401).send('Failed to authenticate token.');
        }else{
            // if everything good, save to request for use in other routes
            req.userID = decoded.userID;
            next();
        }
    });
}

exports.decodeVendorToken = function(req){
    let token = req.headers.authorization.split(" ")[1];
    return jwt.decode(token, config.jwtTokenSecret);
}
exports.createToken = function(obj){
    var token = jwt.sign(obj, config.jwtTokenSecret, {
        expiresIn: 86400 // expires in 24 hours
    });
    return token;
}
exports.createPassword = function(str){
    var t = bcrypt.hash(str, saltRounds, function(err, hash) {
        return hash;
    });
    return t;
}

exports.parseFormData = function(req){
    return new Promise(function(success,fail){
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields,files) {
            if(err){
                fail(err);
            }else{
                success({"fields":fields,"files":files});
            }
        });
    });
}


