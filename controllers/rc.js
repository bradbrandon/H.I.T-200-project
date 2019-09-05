var Cryptr = require('cryptr');
var express = require("express");
var connection = require('./../Config');
// cryptr = new Cryptr('myTotalySecretKey');

module.exports.register = function (req, res) {
    var today = new Date();

    var encryptedString = cryptr.encrypt(req.body.password);
    var users = {
        "Name": req.body.name,
        "regno": req.body.regno,

        "password": encryptedString,
        "email": req.body.email,
        "School": req.body.school,
        "Dept": req.body.dept,
        "created": today,
        "modified": today
    }
    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                message: 'user registered sucessfully'
            })
        }
    });
}