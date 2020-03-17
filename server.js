var express = require('express');
var bodyParser = require('body-parser');
var serverless = require('serverless-http');
var cors = require('cors');
// create express app
var app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.json({
        "message": "This is a test application for equipment CRUD"
    });
});


require('./app/routes/equipment.routes.js')(app);


module.exports.handler = serverless(app);