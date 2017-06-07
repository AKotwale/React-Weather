var React = require('react');

var UnitSelection = React.createClass({

    toggelUnits : function(e) {

           if(e.currentTarget.checked === true) {
             console.log("checked");
             this.props.onToggel( "imperial" );
           } else {
             console.log("checked");
             this.props.onToggel( "metric" );
           }
    },
    render : function() {
      var  { units }  = this.props;

        return(

        <div>
          <div className="switch">
            <input onChange={this.toggelUnits} checked={ units === "imperial"} className="switch-input" id="yes-no" type="checkbox" name="unitSelection"/>
            <label className="switch-paddle" htmlFor="yes-no">
              <span className="switch-active" aria-hidden="true">F</span>
              <span className="switch-inactive" aria-hidden="true">C</span>
            </label>
         </div>
        </div>


        );
    }
});

module.exports = UnitSelection;
