var connection = require('./../Config');
var express = require("express");
app.set('view engine', 'ejs');

app.get('/home', function (req, res) {

    connection.query('SELECT  * FROM notifications', function (error, results, fields) {
        if (error) {
            throw (error);

        } else {
            var data = results;
            res.render(__dirname + "/views/pages/" + "home.ejs", { print: data });


        }
        console.log("results Successful queryed");


    });
});

