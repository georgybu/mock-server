const router = require('express').Router();

const defaultTimeoutMs = 500; // 0ms delay - it's super fast.

[
  ['get ', '/', {message: 'ready'}],
  ['post', '/DBLocking', true],
  ['get ', '/Licences', require('./data/Licences/all.json')],
].map((item) => {
  const [method, url, response = null, statusCode = 200] = item;

  router[method.trim()](url, (req, res) => {
    if (statusCode === 200) {
      setTimeout(() => res.json(response), defaultTimeoutMs);
    } else {
      return res.status(statusCode).send(response);
    }
  });
});

module.exports = router;
