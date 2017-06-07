var axios = require('axios');

const OPEN_WEATHER_MAP_URL ='http://api.openweathermap.org/data/2.5/weather?appid=dd29edf892f7eeb908218144ac829590';

module.exports = {
    getTemp : function(location, unit) {
      var encodedLocation = encodeURIComponent(location);
      var encodedUnit = encodeURIComponent(unit);
       var requestUrl = `${OPEN_WEATHER_MAP_URL}&units=${encodedUnit}&q=${encodedLocation}`;
      return axios.get(requestUrl).then(function(res){
             if(res.data.cod && res.data.message) {
               throw new Error(res.data.message);
             } else {
               return res.data.main.temp;
             }
       },function(res){
         throw new Error(res);
       });
    }
  }
