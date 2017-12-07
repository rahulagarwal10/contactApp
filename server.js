var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongodb = require("./databaseConfig.js");

var app = express();
var port = 3000;
var srcpath = path.join(__dirname, '/public');

app.use(express.static('public'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));


var model = require("./models/user");

//api to get data from database
app.get("/api/getContacts", function (req, res) {
    model.find({}, function (error, data) {
        if (error) {
            res.send(error);
        }
        else {
            res.send(data);
        }
    });
});

//api to Update contact in database
app.post("/api/updateContact", function (req, res) {
    model.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            officeContact: req.body.officeContact,
            personalContact: req.body.personalContact,
            address: req.body.address
        },
        function (error) {
            if (error) {
                res.send(error);
                return;
            }
            res.send({data: "Contact has been Updated..!!"});
        });
});


//api to Insert contact in database
app.post("/api/addContact", function (req, res) {

    var mod = new model(req.body);
    mod.save(function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({data: "Contact has been Inserted..!!"});
        }
    });
});

//api to Delete contact from database
app.post("/api/deleteContact", function (req, res) {
    model.remove({_id: req.body.id}, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({data: "Contact has been Deleted..!!"});
        }
    });
});

app.get("/", function (req, res) {
    res.sendFile(srcpath + '/index.html');
});

app.listen(port, function () {});
