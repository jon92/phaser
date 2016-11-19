'use strict';

const express = require('express');
const mapObject = require('./map');

// Constants
const PORT = 8080;

// App
const app = express();
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use('/images', express.static(__dirname + '/images'));
app.use('/client', express.static(__dirname + '/client'));
app.use('/css', express.static(__dirname + '/css'));
app.locals.inspect = require('util').inspect;

app.get('/', function (req, res) {
  //res.sendfile('index.html', {root: __dirname});
  var map = mapObject.create();
  res.render('index.ejs', {map: map});
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
