/**
 * Lightweight http mock server with express.js
 * Created by Georgy Bunin <bunin.co.il@gmail.com>
 * Licensee: MIT
 *
 * Please, edit api.js for mapping your mock.
 * Support CORS.
 */

var app = require('express')();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var http_port = process.env.PORT || 8081;
var router = require('./api');

function setOrigin() {
    var headers = [
        "Origin",
        "X-Requested-With",
        "X-TargetMcu",
        "X-CustomToken",
        "Content-Type",
        "Accept",
        "Authorization"
    ];
    return function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", headers.join(', '));
        ('OPTIONS' == req.method) ? res.sendStatus(200) : next();
    };
}

function setContentType() {
    return function (req, res, next) {
        res.contentType('application/json');
        next();
    };
}

router.use(setContentType());

app.use(setOrigin());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);
app.listen(http_port);

console.log('app ready on ' + http_port + ' port');
