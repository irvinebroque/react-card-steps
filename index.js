/**
 * @jsx React.DOM
 */

var React = require('react/addons');
var StepStore = require('./StepStore');
var StepActions = require('./StepActions');
var Hammer = require('hammerjs');


function getStateFromStores() {

  // Get stuff from the store
  var currentStep = StepStore.getCurrentStep();
  var stepCount = StepStore.getStepCount();

  var wrapperWidth = stepCount * 100;
  var childWidth = 100 / stepCount;
  var transformPosition = ((currentStep - 1) / stepCount)  * -100;

  return {
    currentStep: currentStep,
    stepCount: stepCount,
    containerStyle: {
      overflow: 'hidden'
    },
    wrapperStyle: {
      // this should equal the # of steps times 100
      width: wrapperWidth + '%',
      transform: 'translateX(' + transformPosition + '%)',
      transition: 'all ease-out 0.25s'
    },
    childStyle: {
      display: 'inline-block',
      width: childWidth + '%'
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

    // get the # of steps from react.children.count
    var stepCount = React.Children.count(this.props.children);
    // then need to push this # to the stepStore using an action
    StepActions.setTotalSteps(stepCount);
    // var foo = StepStore.getStepCount();
    this.setState({totalSteps: stepCount});

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

    // Set local variable to the childStyle component state
    var childStyle = this.state.childStyle;

    var container = React.DOM.div({style: this.state.containerStyle},
      React.DOM.div({style: this.state.wrapperStyle},
        React.Children.map(this.props.children, function(child) {
          return React.DOM.div({style: childStyle}, React.addons.cloneWithProps(child))
        })
      )
    );

    return React.addons.cloneWithProps(container)
  },

  next: function(ev) {
    StepActions.nextStep();
  },

  prev: function(ev) {
    StepActions.prevStep();
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = ReactCardSteps;
