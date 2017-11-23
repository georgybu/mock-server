var router = require('express').Router();

const defaultTimeoutMs = 500; // 0ms delay - it's super fast.

[
    ['get ', '/', {message: 'ready'}],
    ['post', '/DBLocking', true],
    ['get ', '/Licences', require('./data/Licences/all.json')],
].map(function (item) {
    var httpMethod = item[0].trim();
    var url = item[1];
    var response = item[2] || null;
    var statusCode = item[3] || 200;

    router[httpMethod](url, function (req, res) {
        if (statusCode === 200) {
            setTimeout(function () {
                res.json(response);
            }, defaultTimeoutMs);
        } else {
            if (typeof response !== 'undefined') {
                res.status(statusCode).send(response);
            } else {
                res.sendStatus(statusCode);
            }
        }
    });
});

module.exports = router;
