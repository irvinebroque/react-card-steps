var StepDispatcher = require('./StepDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _currentStep = 1;
var _steps = [];

function _setTotalSteps(count) {

  // set array length to count

  for (var i = 0; i < count; i++) {
    _steps[i] = i;
  }
  console.log(_steps);
  return _steps;
}

function _setCurrentStep(stepNumber) {
  _currentStep = stepNumber;
}

function _nextStep() {
  _currentStep += 1;
}

function _prevStep() {
  _currentStep -= 1;
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
    return _currentStep;
  },

  getStepCount: function() {
    return _steps.length;
  }

});

StepStore.dispatchToken = StepDispatcher.register(function(payload) {
  var action = payload.action;

  console.log(action);

  if (action === 'STEP_SET_TOTAL') {
    _setTotalSteps(payload.stepCount);
    StepStore.emitChange();
  } else {
    console.log("did nothing. i'm lazy")
  }

});

module.exports = StepStore;
