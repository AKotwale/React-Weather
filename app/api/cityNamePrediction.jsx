var axios = require('axios');

const PORT = process.env.PORT || 3001;
const CITY_NAMES_PREDICTION_URL ='https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&language=pt_BR&key=AIzaSyD64nVQSEfh3gCP0GwKsgeLReHuXWK2iZ8';

const HOST = process.env.HOST || "localhost";

module.exports = {
    getCityNames : function(location) {
      console.log("location needs to search -" + location);
      var encodedLocation = encodeURIComponent(location);
      //var requestUrl = `${CITY_NAMES_PREDICTION_URL}&input=${encodedLocation}`;
      var requestUrl = `https://${HOST}:${PORT}/getPrediction?location=${encodedLocation}`
      console.log("Url for calling the predictions-" + requestUrl);
      return axios.get(requestUrl).then(function(res){
        console.log("got predictions " + res.data.predictions);
                  return res.data.predictions;
       },function(res){
         console.log("got error." + res);
         throw new Error(res);
       });
    }
  }
