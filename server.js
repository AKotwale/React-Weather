var express = require('express');


// Create our app
var app = express();
app.use(express.static('public'));
var request = require('request');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


app.options("/*", function(req, res, next){
  console.log("option request tracking..");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.send(200);
});

const PORT = process.env.PORT || 3001;

 app.use(function(req,res,next){
   if (process.env.HOST === undefined){
             var host = req.headers.host.replace(/:\d+$/, '');
             process.env.HOST     = host;
             process.env.CUSTOM_CALLBACK_URI = '//' + host + '/callback';
   }

  if( req.headers['x-forwarded-proto'] === "http") {
      next();
  } else {
    res.redirect('http://' + req.hostname +  req.url);
  }
});

const CITY_NAMES_PREDICTION_URL ='https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&language=pt_BR&key=AIzaSyD64nVQSEfh3gCP0GwKsgeLReHuXWK2iZ8';
//const OPEN_WEATHER_MAP_URL ='http://api.openweathermap.org/data/2.5/weather?appid=dd29edf892f7eeb908218144ac829590';

app.get('/getPrediction', (req, res)=>{
//var encodedUnit = "metric";
 var encodedLocation = encodeURIComponent(req.query.location);
 var requestUrl = `${CITY_NAMES_PREDICTION_URL}&input=${encodedLocation}`;
 //var requestUrl = `${OPEN_WEATHER_MAP_URL}&units=${encodedUnit}&q=${encodedLocation}`;
  console.log("encodedLocation " + encodedLocation);
  console.log("Url for calling the predictions-" + requestUrl);
  request.get(requestUrl, function(error, response, body) {
        body = JSON.parse(body);
        console.log(body.predictions);
        console.log(body.predictions.length)
        res.send(body);
    });
});

app.listen(PORT, function () {
  console.log('Express server is up on port 3000');
});
