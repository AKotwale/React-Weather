var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var UnitSelection = require('UnitSelection');

var Weather = React.createClass({
      getInitialState : function () {
              return {
                   location : 'Miami',
                   temp : 23,
                   units : 'imperial',
                   wait : 0
              };
      },
      onToggle: function(newunits)  {
          this.setState({
               units: newunits,
          },this.handleSearch(this.state.location, newunits));
      },
      handleSearch : function(location, units) {

        units = units || this.state.units;

        console.log("location :-" + location + " units - " + this.state.units)
        var that = this;
                openWeatherMap.getTemp(location,units).then( function(temp) {
                  that.setState( {
                    location:location,
                    temp : temp,
                  });
                }, function(errorMessage) {
                  alert(errorMessage);
                });

      },
      render : function() {
          var {location, temp, units, wait} = this.state;

          return(
              <div>
                  <WeatherForm onSearch={this.handleSearch}></WeatherForm>
                  <UnitSelection units={this.state.units} onToggel={this.onToggle}></UnitSelection>
                  <WeatherMessage location={location} temp={temp} units={units} wait={wait}></WeatherMessage>
              </div>
          );
      }
});

module.exports = Weather;
