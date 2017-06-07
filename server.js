var express = require('express');
var cors = require('cors');

// Create our app
var app = express();
app.use(express.static('public'));

app.options("/*", function(req, res, next){
  console.log("option request tracking..");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

app.listen(3000, function () {
  console.log('Express server is up on port 3000');
});
