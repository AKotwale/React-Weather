'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var axios = require('axios');
var request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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



app.listen(5001);
console.log('Listening on localhost:5001');
