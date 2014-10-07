/**
 * @jsx React.DOM
 */

var React = require('react');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var Hammer = require('hammerjs');

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

    this.hammer = new Hammer(this.getDOMNode());
    this.hammer.on('swipeleft', this.next);
    this.hammer.on('swiperight', this.prev);

  },

  componentWillUnmount: function() {
    StepStore.removeChangeListener(this._onChange);
    this.hammer.off('swipeleft', this.swipeLeft);
  },

  render: function() {

    var steps = this.props.stepData.map(getSteps);

    return (
      <div>
        {steps}
      </div>
    )
  },

  next: function(ev) {
    console.log(ev);
    console.log('i got swiped left, so i go to the next card!');
  },

  prev: function(ev) {
    console.log(ev);
    console.log('i got swiped right, so i go to the previous card!');
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
        <button onClick={this.next}>next</button>
      </div>
    );
  },

  next: function(event) {
    _nextStep();
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
