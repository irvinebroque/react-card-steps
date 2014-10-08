var StepDispatcher = require('./StepDispatcher');

var StepActions = {

  setTotalSteps: function(stepCount) {
    StepDispatcher.dispatch({
      action: 'STEP_SET_TOTAL',
      stepCount: stepCount
    });
  },

  nextStep: function() {
    StepDispatcher.dispatch({
      action: 'STEP_NEXT'
    });
  },

  prevStep: function() {
    StepDispatcher.dispatch({
      action: 'STEP_PREV'
    });
  }

};

module.exports = StepActions;
