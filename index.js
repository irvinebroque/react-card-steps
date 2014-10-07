/**
 * @jsx React.DOM
 */

var React = require('react');

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
    return (
      <div>foo</div>
    )
  }


});

React.renderComponent(
    <ReactCardSteps />,
    document.getElementById('react')
);
