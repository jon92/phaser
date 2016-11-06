'use strict';

const express = require('express');

// Constants
const PORT = 8080;

// App
const app = express();
app.use('/images', express.static(__dirname + '/images'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function (req, res) {
  res.sendfile('index.html', {root: __dirname});
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
