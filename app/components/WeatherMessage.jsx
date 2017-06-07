var React = require('react');


var WeatherMessage = React.createClass({

    render : function() {
        var tempUnit;
        var {location, temp, units} = this.props;
        if( units === "imperial") {
             tempUnit = " F";
        }  else if (units === "metric") {
             tempUnit = " C";
        }
        return(
            <div>
             <p><h2>It is {temp}{tempUnit} in {location}</h2></p>
            </div>
        );
    }
});

module.exports = WeatherMessage;
