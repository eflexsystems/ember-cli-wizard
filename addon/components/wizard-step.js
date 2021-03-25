import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  isCurrent: computed('stepId', 'wizardCurrentState.currentStep', function () {
    return this.stepId === this.wizardCurrentState?.currentStep;
  }),

  slidingOut: computed(
    'isCurrent',
    'wizardCurrentState.{animating,direction}',
    function () {
      if (isPresent(this.wizardCurrentState)) {
        if (this.isCurrent && this.wizardCurrentState?.animating) {
          if (this.wizardCurrentState?.direction === 'next') {
            this.set('slidingInClasses', 'exit slide-left');
          } else {
            this.set('slidingInClasses', 'exit slide-right');
          }

          return true;
        }
      }

      return false;
    }
  ),

  slidingIn: computed('stepId', 'wizardCurrentState.animating', function () {
    let wizardCurrentState = this.wizardCurrentState;
    if (isPresent(wizardCurrentState)) {
      if (wizardCurrentState.direction === 'next') {
        let nextStepId = wizardCurrentState.currentStep + 1;
        if (this.stepId === nextStepId) {
          this.set('slidingInClasses', 'enter slide-left');
          return true;
        }
      } else {
        let prevStepId = wizardCurrentState.currentStep - 1;
        if (this.stepId === prevStepId) {
          this.set('slidingInClasses', 'enter slide-right');
          return true;
        }
      }
    }

    return false;
  }),
});
