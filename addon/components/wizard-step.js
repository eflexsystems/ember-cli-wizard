import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  isCurrent: computed('stepId', 'wizardCurrentState.currentStep', function () {
    return this.stepId === this.wizardCurrentState?.currentStep;
  }),

  slidingInClasses: computed(
    'isCurrent',
    'wizardCurrentState.{animating,direction}',
    'stepId',
    function () {
      let wizardCurrentState = this.wizardCurrentState;

      if (!isPresent(wizardCurrentState)) {
        return '';
      }

      if (this.isCurrent && wizardCurrentState.isAnimating) {
        if (wizardCurrentState.direction === 'next') {
          return 'exit slide-left';
        }
        return 'exit slide-right';
      }

      if (
        wizardCurrentState.direction === 'next' &&
        this.stepId == wizardCurrentState.currentStep + 1
      ) {
        return 'enter slide-left';
      }

      if (this.stepId === wizardCurrentState.currentStep - 1) {
        return 'enter slide-right';
      }

      return '';
    }
  ),

  slidingOut: computed(
    'isCurrent',
    'wizardCurrentState.{animating,direction}',
    function () {
      return this.isCurrent && this.wizardCurrentState?.animating;
    }
  ),

  slidingIn: computed('stepId', 'wizardCurrentState.animating', function () {
    let wizardCurrentState = this.wizardCurrentState;

    if (!isPresent(wizardCurrentState)) {
      return false;
    }

    if (wizardCurrentState.direction === 'next') {
      return this.stepId === wizardCurrentState.currentStep + 1;
    } else {
      return this.stepId === wizardCurrentState.currentStep - 1;
    }
  }),
});
