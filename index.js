/**
 * Lightweight http mock server with express.js
 * Created by Georgy Bunin <bunin.co.il@gmail.com>
 * Licensee: MIT
 *
 * Please, edit api.js for mapping your mock.
 * Support CORS.
 */

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8081;
const router = require('./api');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);

app.listen(port, () => console.log(`server listening on port ${port}!`));
