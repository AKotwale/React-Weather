var React = require('react');
var Autosuggest = require('react-autosuggest');
var JSONP = require('jsonp');



var WeatherForm = React.createClass({

  getInitialState : function () {
          return {
            value: '',
            suggestions: []
          };
  },
   getSuggestionValue : function(suggestion) {
     //
    //  console.log("Inside getSuggestionValue");
    //  var description = suggestion.description;
    //  if(description != null) {
    //     description = description.substring(description.indexOf(", Estados"), description.lenght-1);
    //  }
    //   return suggestion;
  },
   getSuggestions : function(value) {

     console.log("Inside getSuggestions");
      that = this;
      var suggestions;
      suggestions = cityNamePrediction.getCityNames(value);
      return suggestions;
    },
    renderSuggestion: function(suggestion) {
      return(
            <span>{suggestion}</span>
        );
    },
    onSuggestionsFetchRequested : function(value) {
      var that = this;
      console.log("Inside onSuggestionsFetchRequested");
       JSONP("http://gd.geobytes.com/AutoCompleteCity?filter=US&q="+value.value,null, function(err, data) {
                that.setState({
                     suggestions: data
                });
       });

    },
    shouldRenderSuggestions : function(value) {
        return value.trim().length > 2;
    },
    onSuggestionsClearRequested : function() {
        this.setState({
            suggestions: []
        });
    },
    onChange: function(e) {
       var location = e.target.value || e.target.textContent;
       console.log("location selected by user !!");
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
                     shouldRenderSuggestions = {this.shouldRenderSuggestions}
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
