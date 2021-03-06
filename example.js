/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var ReactCardSteps = require('./index');
var CardSteps = ReactCardSteps.CardSteps;
var StepActions = ReactCardSteps.StepActions;

// -------------
// Example Stuff
// -------------

var exampleSteps = [
  {
    id: 1,
    text: "step 1"
  },
  {
    id: 2,
    text: "step 2"
  },
  {
    id: 3,
    text: "step 3"
  },{
    id: 4,
    text: "step 4"
  },
  {
    id: 5,
    text: "step 5"
  }
]

var StepCard = React.createClass({

  render: function() {
    return (
      <div>
        <div className="exampleCard">
          <span className="exampleCard-text">{this.props.step.text}</span>
          <button onClick={this.prev}>previous</button>
          <button onClick={this.next}>next</button>
        </div>
      </div>
    );
  },

  next: function(event) {
    StepActions.nextStep();
  },

  prev: function(event) {
    StepActions.prevStep();
  }

});

function getSteps(step) {
  return (
    <StepCard
      key={step.id}
      step={step}
    />
  );
}

var App = React.createClass({

  getDefaultProps: function() {
    return {
      stepData: []
    }
  },

  render: function() {

    var steps = this.props.stepData.map(getSteps);

    return (
      <div className="container">
        <CardSteps innerContainerClass="example-innerContainerClass">
          {steps}
        </CardSteps>
      </div>
    );
  }

});

React.renderComponent(
    <App stepData={exampleSteps} />,
    document.getElementById('react')
);
