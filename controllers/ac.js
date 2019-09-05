var Cryptr = require('cryptr');
var express = require("express");
cryptr = new Cryptr('myTotalySecretKey');

var connection = require('./../Config');
module.exports.authenticate = function (req, res) {
    var regno = req.body.regno;
    var password = req.body.password;

    connection.query('SELECT * FROM users WHERE regno = ?', [regno], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {

            if (results.length > 0) {
                decryptedString = cryptr.decrypt(results[0].password);
                if (password == decryptedString) {
                    this.user = {
                        name:results[0].Name,
                        regno:results[0].regno
                    }
                    
                    res.redirect('/home');
                    console.log("Login Successful");
                } else {
                    res.json({
                        status: false,
                        message: "Regno and password does not match"
                    });
                    console.log("Login Failed");
                }

            }
            else {
                res.json({
                    status: false,
                    message: "regno does not exits"
                });
                console.log("Login Failed");
            }
        }
    });
}