/**
 * @jsx React.DOM
 */

var React = require('react');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

function getSteps(step) {
  return (
    <Step
      key={step.id}
      step={step}
    />
  );
}

function getStateFromStores() {
  return {
    currentStep: StepStore.getCurrentStep()
  }
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
    return getStateFromStores();
  },

  componentDidMount: function() {
    StepStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    StepStore.removeChangeListener(this._onChange);
  },

  render: function() {

    var steps = this.props.stepData.map(getSteps);

    return (
      <div>
        {steps}
      </div>
    )
  },

  _onChange: function() {
    this.setState(getStateFromStores());
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
        <button onClick={_nextStep}>next</button>
      </div>
    );
  },

  next: function(event) {
    console.log('next was clicked');
  }

});

var CHANGE_EVENT = 'change';

var _stepCounter = 1;

function _nextStep() {
  _stepCounter += 1;
}

function _prevStep() {
  _stepCounter -= 1;
}

var StepStore = merge(EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCurrentStep: function() {
    return _stepCounter;
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
