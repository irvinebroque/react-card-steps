/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;
var Hammer = require('hammerjs');

function getStateFromStores() {
  return {
    currentStep: StepStore.getCurrentStep(),
    containerStyle: {
      overflow: 'hidden'
    },
    wrapperStyle: {
      width: '400%'
    },
    cardStyle: {
      display: 'inline-block'
    }
  }
}

var ReactCardSteps = React.createClass({

  displayName: 'ReactCardSteps',

  propTypes: {
    next: React.PropTypes.func,
    prev: React.PropTypes.func,
    goto: React.PropTypes.func
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

    delete this.hammer;
  },

  render: function() {

    // need to get the # of steps from react.children.count here
    // then need to push this # to the stepStore

    var container = React.DOM.div({style: this.state.containerStyle},
      React.DOM.div({style: this.state.wrapperStyle},
        React.Children.map(this.props.children, function(child) {
          return React.DOM.div({style: {display: "inline-block"}}, React.addons.cloneWithProps(child))
        })
      )
    )

    return React.addons.cloneWithProps(container)
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

var StepCard = React.createClass({

  render: function() {
    console.log('this should get called when step card gets rendered');
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


function getSteps(step) {
  console.log(step);
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

  getInitialState: function() {
    return getStateFromStores();
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
