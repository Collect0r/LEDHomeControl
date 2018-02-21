var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var led = [{
    mode: 1, R1: 255, G1: 0, B1: 0,
    R2: 0, G2: 200, B2: 0,
    R3: 0, G3: 0, B3: 255,
    R4: 0, G4: 0, B4: 255
}];

app.use(express['static'](__dirname));

// Express route for incoming requests
app.get('/led', function (req, res) {
    res.status(200).send(led[0]);
});

app.post('/led', function (req, res) {
    led[0] = req.body;
    res.send(led[0]);
});


// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
    res.status(404).send('Unrecognised API call');
});

// Express route to handle errors
app.use(function (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Oops, Something went wrong!');
    } else {
        next(err);
    }
});


app.listen(3000);
console.log('App Server running at port 3000');
