/**
 * @jsx React.DOM
 */

var React = require('react');

function getSteps(step) {
  return (
    <Step
      key={step.id}
      step={step}
    />
  );
}

var ReactCardSteps = React.createClass({

  displayName: 'ReactCardSteps',

  propTypes: {
    stepData: React.PropTypes.array,
    next: React.PropTypes.func,
    prev: React.PropTypes.func,
    goto: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      stepData: []
    }
  },

  getInitialState: function() {
    return {
      currentStep: 1
    }
  },

  render: function() {

    console.log(this.props.stepData);

    var steps = this.props.stepData.map(getSteps);

    return (
      <div>
        {steps}
      </div>
    )
  }


});

var Step = React.createClass({

  displayName: 'Step',

  propTypes: {
    step: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      stepData: {}
    }
  },

  render: function() {
    return (
      <div>
        this is a step
      </div>
    );
  }

});

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

React.renderComponent(
    <ReactCardSteps stepData={exampleSteps} />,
    document.getElementById('react')
);
