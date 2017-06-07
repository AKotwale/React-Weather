var React = require('react');
var Autosuggest = require('react-autosuggest');
var cityNamePrediction = require('cityNamePrediction');



var WeatherForm = React.createClass({

  getInitialState : function () {
          return {
            value: '',
            suggestions: []
          };
  },
   getSuggestionValue : function(suggestion) {
     console.log("Inside getSuggestionValue");
     var description = suggestion.description;
     if(description != null) {
       description = description.substring(description.indexOf(", Estados"), description.lenght-1);
     }
     return description },
   getSuggestions : function(value) {

     console.log("Inside getSuggestions");
      that = this;
      var suggestions;
      cityNamePrediction.getCityNames(value).then( function(suggestions) {

           that.suggestions = suggestions;

      }, function(errorMessage) {
        alert(errorMessage);
      });


      return suggestions;
    },
    renderSuggestion: function(suggestion) {

      var description = suggestion.description;
      if(description != null) {
        description = description.substring(description.indexOf(", Estados"), description.lenght-1);
      }
      return(

            <span><input type="text" placeholder="type city name" ref="location" value={description}/></span>
          //suggestion
        );
    },
    onSuggestionsFetchRequested : function(value) {
      var that = this;
      console.log("Inside onSuggestionsFetchRequested");
      cityNamePrediction.getCityNames(value.value).then( function(suggestions) {
        console.log("suggestion values got from the api-" + suggestions);
        that.setState({
           suggestions: suggestions
        });
      }, function(errorMessage) {
         console.log("Error got while calling the webservice .." + errorMessage);
      });



    },
    onSuggestionsClearRequested : function() {
        this.setState({
            suggestions: []
        });
    },
    onChange: function(e) {
       var location = e.target.value;
       this.setState({
            value: location
       });
    },
    onFormSubmit : function(e) {
         e.preventDefault();
         var location = this.state.value;
         if(location.length > 0) {
             this.props.onSearch(location);
         }
    },
    render : function() {
        var {value, suggestions} = this.state;

        // Autosuggest will pass through all these props to the input element.
        const inputProps = {
            placeholder: 'Type City Name',
            value,
            onChange: this.onChange
        };

        return(
            <div>
            <form onSubmit={this.onFormSubmit}>
               <div>
                 <Autosuggest
                     suggestions={suggestions}
                     onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                     onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                     getSuggestionValue={this.getSuggestionValue}
                     renderSuggestion={this.renderSuggestion}
                     inputProps={inputProps}
               />
               <button className="hallow button expanded">Get Weather</button>
              </div>
            </form>
            </div>
        );
    }
});

module.exports = WeatherForm;
