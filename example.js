/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var ReactCardSteps = require('./index');
var StepActions = require('./StepActions');

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
        this is a step
        <button onClick={this.next}>next</button>
      </div>
    );
  },

  next: function(event) {
    console.log('next was clicked');
    StepActions.nextStep();
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
      <ReactCardSteps>
        {steps}
      </ReactCardSteps>
    );
  }

});

React.renderComponent(
    <App stepData={exampleSteps} />,
    document.getElementById('react')
);
