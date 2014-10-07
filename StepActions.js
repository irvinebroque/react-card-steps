var StepDispatcher = require('./StepDispatcher');

var StepActions = {

  setTotalSteps: function(stepCount) {

    console.log("StepActions -- setTotalSteps got called");

    StepDispatcher.dispatch({
      action: 'STEP_SET_TOTAL',
      stepCount: stepCount
    });
  },

  nextStep: function() {

    console.log("StepActions -- nextStep got called");

    StepDispatcher.dispatch({
      action: 'STEP_NEXT'
    });
  }

};

module.exports = StepActions;
